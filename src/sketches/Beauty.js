import { EffectPass, SavePass, BlurPass, KernelSize } from 'postprocessing';

import { Mesh, MeshBasicMaterial, TextureLoader } from 'three';
import { webcamEffect, renderPass } from '../setup';
import { FaceDetailEffect } from '../effects/FaceDetailEffect';

import { faceGeometry } from '../faceMesh';

import mapUrl from '../assets/face_highlights.jpg';

export class Beauty {
  constructor({ composer, scene }) {
    const colorTexture = new TextureLoader().load(mapUrl);
    const mat = new MeshBasicMaterial({
      map: colorTexture,
    });

    this.mesh = new Mesh(faceGeometry, mat);

    scene.add(this.mesh);

    const camPass = new EffectPass(null, webcamEffect);

    const blurPass = new BlurPass({
      scale: 0.1,
      kernelSize: KernelSize.SMALL,
    });

    const blurSavePass = new SavePass();

    const renderSavePass = new SavePass();

    const faceDetailEffect = new FaceDetailEffect({
      camTexture: blurSavePass.renderTarget.texture,
      maskTexture: renderSavePass.renderTarget.texture,
    });

    const combineTexturesPass = new EffectPass(
      null,
      webcamEffect,
      faceDetailEffect
    );

    composer.addPass(renderPass);
    composer.addPass(renderSavePass);
    composer.addPass(camPass);
    composer.addPass(blurPass);
    composer.addPass(blurSavePass);
    composer.addPass(combineTexturesPass);
  }

  update() {}
}
