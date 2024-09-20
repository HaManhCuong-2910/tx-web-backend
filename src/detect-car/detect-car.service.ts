import { Injectable, OnModuleInit } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';

@Injectable()
export class DetectCarService implements OnModuleInit {
  model: tf.GraphModel<string | tf.io.IOHandler> = null;

  async onModuleInit() {
    console.log('module init');
    this.model = await tf.loadGraphModel(
      'https://imageapi.mic.vn/model/model_yolo/model.json',
    );
    const zeroTensor = tf.zeros([1, 640, 640, 3], 'float32');
    const result = await this.model.executeAsync(zeroTensor);
    //@ts-ignore
    await Promise.resolve(result.data());
    //@ts-ignore
    result.dispose();
    zeroTensor.dispose();
  }

  async onPredictions(img: tf.Tensor) {
    try {
      const numDetections = 8400;
      const confidenceThreshold = 0.5;
      const labelPassDetects = [2, 5, 6, 7];
      const batched = tf.tidy(() => {
        if (!(img instanceof tf.Tensor)) {
          img = tf.browser.fromPixels(img);
        }
        img = tf.cast(img, 'float32').div(255);
        return tf.expandDims(img);
      });

      // model returns tensor:
      const result = await this.model.executeAsync(batched);

      //@ts-ignore
      const scores = Array.from(result.dataSync());

      // clean the webgl tensors
      batched.dispose();
      tf.dispose(result);
      const newScores = [];
      while (scores.length / 8400) newScores.push(scores.splice(0, 8400));

      const detectedObjects = [];

      for (
        let predictionIndex = 0;
        predictionIndex < numDetections;
        predictionIndex++
      ) {
        const scoresTest = new Array(80).fill(0);
        for (let classIndex = 0; classIndex < 80; classIndex++) {
          scoresTest[classIndex] = newScores[4 + classIndex][predictionIndex];
        }

        let predictedClassIndex = scoresTest.indexOf(
          scoresTest.reduce((a, b) => (a > b ? a : b)),
        );
        let score = scoresTest[predictedClassIndex];
        // String predictedClassLabel = _labels[predictedClassIndex];

        if (score >= confidenceThreshold) {
          let detectedObject = {
            label: predictedClassIndex,
            score: score,
          };

          detectedObjects.push(detectedObject);
        }
      }

      let maxScore = 0,
        label = 0;
      for (let i = 0; i < detectedObjects.length; i++) {
        if (detectedObjects[i].score >= maxScore) {
          maxScore = detectedObjects[i].score;
          label = detectedObjects[i].label;
        }
      }

      return labelPassDetects.includes(label);
    } catch (error) {
      return false;
    }
  }

  async onModelDetect() {}

  async handleDetect(body: { data: tf.Tensor[] }) {
    const listFunctionDetect = body.data.map((item) => {
      return this.onPredictions(item);
    });
    const resultArr = await Promise.all(listFunctionDetect);
    for (let index = 0; index < resultArr.length; index++) {
      const isCar = resultArr[index];
      if (isCar) {
        return {
          isPass: true,
          index,
        };
      }
    }
    return {
      isPass: true,
      index: null,
    };
  }
}
