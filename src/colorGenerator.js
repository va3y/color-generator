import chroma from "chroma-js";
import { hsluvToHex } from "hsluv";
import seedrandom from "seedrandom";

export default class ColorGenerator {
  constructor(
    hueNumber,
    totalColorsNumber,
    saturation,
    lightness,
    scaleOrDarken,
    seed
  ) {
    this.seed = seed
    saturation = parseFloat(saturation);
    lightness = parseFloat(lightness);
    this.baseHueArray = this._generateBaseHueArray(hueNumber);
    const baseColors = this._generateBaseColors(
      this.baseHueArray,
      saturation,
      lightness
    );
    if (scaleOrDarken) {
      this.RGBColorArray = this.generateShades(baseColors, totalColorsNumber);
    } else {
      this.RGBColorArray = this.darken(baseColors, totalColorsNumber);
    }

    //this.HexColorArray = this.HSLToHex(this.RGBColorArray);
  }

  static correntLightnessAndSaturation(colorsArr, saturation, lightness) {
    const outputArr = [];
    for (let i = 0; i < colorsArr.length; i++) {
      // let newHSL = chroma(...colorsArr[i]).hsl();
      // newHSL[1] = saturation*100;
      // newHSL[2] = lightness*100;
      // console.log('new hsl is ',newHSL);
      // const newHEX = hsluvToHex([newHSL[0], newHSL[1], newHSL[2]]);
      // const newRGB = chroma(newHEX).rgb();
      // console.log(newRGB);
      // outputArr.push(newRGB);
      // console.log(colorsArr[i]);
      // console.log(saturation);
      // console.log(lightness);
      // const newHSLUV = rgbToHsluv([colorsArr[i][0]/255, colorsArr[i][1]/255, colorsArr[i][2]/255]);
      // newHSLUV[1] = saturation*100;
      // newHSLUV[2] = lightness*100;
      // console.log('NEW HSLUC',newHSLUV);
      // const newHex = hsluvToHex(newHSLUV);
      // const newRGB = chroma(newHex).rgb();
      // console.log(newRGB);
      // outputArr.push(newRGB);

      const newColor = chroma(colorsArr[i])
        .set("hsl.s", saturation)
        .set("hsl.l", lightness)
        .rgb(true);

      outputArr.push(newColor);
    }
    return outputArr;
  }

  _createHSL(hue, saturation, lightness) {
    return {
      hue,
      saturation,
      lightness,
    };
  }

  _generateBaseHueArray(hueNumber) {
    //360 is total! :)
    const randomFromSeed = seedrandom(this.seed)();

    console.log(this.seed);
    let outputArr = [];

    const randomHue = Math.floor(randomFromSeed * 360);
    outputArr.push(randomHue);
    let color;
    for (let i = 1; i < hueNumber; i++) {
      color = (randomHue + i * (360 / hueNumber)) % 360;

      outputArr.push(color);
    }
    return outputArr;
  }

  //const extraFadesNumber = shadesNumber - huesArray.length;
  // let totalCounter = 0;
  // let curr = 0;
  // while (totalCounter < extraFadesNumber * 2 - 1) {

  //   console.log(curr);
  //   console.log("LENGTH IS", huesArray.length);
  //   if (curr >= huesArray.length) {
  //     curr = curr - huesArray.length;
  //   }
  //   const initialShade = huesArray[curr];
  //   const newShade = {
  //     hue: initialShade.hue - 20,
  //     saturation: initialShade.saturation - 0.2,
  //     lightness: initialShade.lightness,
  //   };
  //   huesArray.splice(huesArray[curr+1], 0, newShade);

  //   totalCounter += 2;
  //   curr += 2;
  // }

  //Let's try chroma scale here!
  _generateBaseColors(huesArray, saturation, lightness) {
    const baseColors = [];
    for (let i = 0; i < huesArray.length; i++) {
      baseColors.push(
        chroma(
          hsluvToHex([huesArray[i], saturation * 100, lightness * 100])
        ).rgb()
      );
    }

    if (baseColors.length === 1) {
      baseColors.push(chroma("black"));
      baseColors.unshift(chroma("white"));
    }

    baseColors.map((c) => {
      return chroma(c).rgb();
    });

    return baseColors;
  }

  generateShades(baseColors, shadesNumber) {
    const basescale = chroma.scale(baseColors).mode("lab");
    const outputArr = [];
    console.log(shadesNumber);
    for (let i = 0; i < shadesNumber; i++) {
      outputArr.push(basescale(i / shadesNumber).rgb());
    }
    return outputArr;
  }

  darken(baseColors, shadesNumber) {
    // for (let i = 0; i < baseColors.length; i++) {
    //   outputArr.push(baseColors[i]);
    //   counter = 0;
    //   while (
    //     counter <
    //     (shadesNumber - baseColors.length) / baseColors.length - 1
    //   ) {
    //     outputArr.push(
    //       chroma(baseColors[i])
    //         .darken(0.5*(counter+1))
    //         .rgb()
    //     );
    //     counter++;
    //   }
    // }

    // while (counter < baseColors.length * 2) {
    //   if (counter * 2 >= shadesNumber) {
    //     break;
    //   }
    //   const rand = Math.random();
    //   const darkenedColor = chroma(outputArr[counter])
    //     .darken(rand)
    //     //.desaturate(0.2)
    //     .rgb();
    //   outputArr.splice(counter, 0, darkenedColor);
    //   counter += 2;
    // }

    const initialLength = baseColors.length;

    let nestedArr = [];

    //create the nested array
    for (let i = 0; i < baseColors.length; i++) {
      nestedArr.push([baseColors[i]]);
    }

    //add extra shades to each 2nd-level array
    const extraColors = shadesNumber - initialLength;
    for (let i = 0; i < extraColors; i++) {
      const currColor =
        nestedArr[i % initialLength][nestedArr[i % initialLength].length - 1];
      //const currHue = chroma(currColor).get('hsl.h')
      nestedArr[i % initialLength].push(
        chroma(currColor)
          .darken(0.5)
          .saturate(0.3)
          .rgb()
      );
    }
    nestedArr[0].reverse();

    //Destruct the 2-dim array 1-dim
    let outputArr = [];
    for (let colorArr of nestedArr) {
      for (let color of colorArr) {
        outputArr.push(color);
      }
    }
    return outputArr;
  }

  HSLToHex(HSLArr) {
    const RGBArr = [];
    for (let i = 0; i < HSLArr.length; i++) {
      const newRGB = chroma(
        HSLArr[i].hue,
        HSLArr[i].saturation,
        HSLArr[i].lightness,
        "hsl"
      ).hex();
      RGBArr.push(newRGB);
    }
    return RGBArr;
  }
}
