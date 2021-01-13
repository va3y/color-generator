import chroma from "chroma-js";

export default class ColorGenerator {
  constructor(hueNumber, totalColorsNumber, saturation, lightness) {
    saturation = parseFloat(saturation);
    lightness = parseFloat(lightness);
    console.log(saturation);
    console.log(lightness);
    this.baseHueArray = this._generateBaseHueArray(hueNumber);
    this.RGBColorArray = this._generateShades(
      this.baseHueArray,
      totalColorsNumber,
      saturation,
      lightness
    );
    this.HexColorArray = this.HSLToHex(this.RGBColorArray);
  }

  static correntLightnessAndSaturation(colorsArr, saturation, lightness) {
    console.log('ping')
    const outputArr = [];
    for (let i = 0; i < colorsArr.length; i++) {
      outputArr.push(
        chroma(colorsArr[i])
          .set("hsl.s", saturation)
          .set("hsl.l", lightness)
          .rgb(true)
      );
    }
    return outputArr
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
    let outputArr = [];

    const randomHue = Math.floor(Math.random() * 360);
    outputArr.push(randomHue);
    let color;
    for (let i = 1; i < hueNumber; i++) {
      color = (randomHue + i * (360 / hueNumber)) % 360;

      outputArr.push(color);
    }
    return outputArr;
  }

  _generateShades(huesArray, shadesNumber, saturation, lightness) {
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
    const baseColors = [];
    for (let i = 0; i < huesArray.length; i++) {
      baseColors.push(chroma.hsl(huesArray[i], saturation, lightness));
    }

    if (baseColors.length === 1) {
      baseColors.push(chroma("black"));
      baseColors.unshift(chroma("white"));
    }

    const basescale = chroma.scale(baseColors).mode("lab");
    const outputArr = [];
    for (let i = 0; i < shadesNumber; i++) {
      outputArr.push(basescale(i / shadesNumber).rgb());
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
