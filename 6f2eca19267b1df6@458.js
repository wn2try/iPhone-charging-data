function _1(md){return(
md`# iPhone充电数据 -- 苹果12W`
)}

function _chargingPlot(Plot,plotData,tip50,tip80,tip95,plotBattery){return(
Plot.plot({
  width: 800,
  height: 660,
  marginLeft: 40,
  marginRight: 50,
  marginBottom: 30,
  marginTop: 20,
  x: { axis: null, transform: (d) => d/60, domain: [0,106] },
  y: { axis: null },
  marks: [
    Plot.ruleX(plotData, Plot.pointerX({x: "duration", py: 10, stroke: "black"})),
    Plot.text(plotData, Plot.pointerX({x: "duration", dy: 20, frameAnchor: "top-left", text: (d) => [`  电量: ${d.batteryLevel}%`, `  电压: ${d.voltage}`, `  电流: ${d.current}`, `  功率: ${d.power}`, `  温度: ${d.batteryTemp}`, `  时间: ${d.durationT}`].join(`\n`)})),
    Plot.tip([tip50.tipText], {x: tip50.duration, anchor: "bottom", dy: -140, textPadding: 4, strokeOpacity: 0.3}),
    Plot.tip([tip80.tipText], {x: tip80.duration, anchor: "top", dy: -110, textPadding: 4, strokeOpacity: 0.3}),
    Plot.tip([tip95.tipText], {x: tip95.duration, anchor: "top", dy: -110, textPadding: 4, strokeOpacity: 0.3}),
//    Plot.tip([tip100.tipText], {x: tip100.duration, anchor: "top", dy: -110, textPadding: 4, strokeOpacity: 0.3}),
//    Plot.tip([tipVoltageChange.tipText], {x: tipVoltageChange.duration, dy: 228, anchor: "right", textPadding: 4, strokeOpacity: 0.3}),
    () => Plot.plot({
      marks: [
        Plot.lineY(plotData, { x: "duration", y: "batteryTemp", stroke: "darkred" }),
      ],
        x: { axis: "top", transform: (d) => d/60, domain: [0,106], line: true, label: "时间（分钟）", labelOffset: -5, labelArrow: false },
        y: { domain: [26,33], ticks: 6, tickSize: 5, inset: true, line: true, nice: true, label: "电池温度（℃）", labelAnchor: "center", labelArrow: false },
      width: 800,
      height: 200,
      marginLeft: 40,
      marginRight: 50,
      marginBottom: 30,
      marginTop: 20,   
    }),
    () => Plot.plot({
      marks: [
        Plot.ruleY([0], {stroke: "grey"}),
        Plot.tickX(plotBattery, {x: "duration", py: "batteryLevel", dy: 5}),
        Plot.text(plotBattery, {x: "duration", py: "batteryLevel", text: (d) => `${d.batteryLevel}`, dy: 20, lineAnchor: "bottom"}),
      ],
        x: { axis: null, transform: (d) => d/60, domain: [0,106] },
        y: { label: "电量（%）", labelAnchor: "center", labelArrow: false, nice: true },
      width: 800,
      height: 215,
      marginLeft: 40,
      marginRight: 50,
      marginBottom: 30,
      marginTop: 195,   
    }),
    () => Plot.plot({
      marks: [
        Plot.lineY(plotData, { x: "duration", y: "power", stroke: "darkblue" }),
      ],
      x: { axis: null, transform: (d) => d/60, domain: [0,106] },
      y: { domain: [0,10], ticks: 10, tickSize: 5, inset: true, line: true, nice: true, label: "功率（W）", labelAnchor: "center", labelArrow: false },
      width: 800,
      height: 480,
      marginLeft: 40,
      marginRight: 50,
      marginBottom: 30,
      marginTop: 220,   
    }),
    () => Plot.plot({
      marks: [
        Plot.lineY(plotData, { x: "duration", y: "voltage", stroke: "darkgoldenrod" }),
      ],
      x: { axis: null, transform: (d) => d/60, domain: [0,106] },
      y: { domain: [4,6], ticks: 3, tickSize: 5, inset: true, line: true, label: "电压（V）", labelAnchor: "center", labelArrow: false, nice: true},
      width: 800,
      height: 600,
      marginLeft: 40,
      marginRight: 50,
      marginBottom: 30,
      marginTop: 460,   
    }),
    () => Plot.plot({
      marks: [
        Plot.lineY(plotData, { x: "duration", y: "current", stroke: "darkcyan" }),
        Plot.ruleY([0])
      ],
      x: { transform: (d) => d/60, domain: [0,106], label: "时间（分钟）", labelArrow: false },
      y: { domain: [0,1.5], ticks: 3, tickSize: 5, inset: true, line: true, label: "电流（A）", labelAnchor: "center", labelArrow: false, nice: true},
      width: 800,
      height: 660,
      marginLeft: 40,
      marginRight: 50,
      marginBottom: 30,
      marginTop: 580,   
    }),
  ]
})
)}


function _tip95(plotData)
{
  let tempd = plotData.find((d) => d.batteryLevel == 95)
  let tipText = `电压: ${tempd.voltage}\n电流: ${tempd.current}\n功率: ${tempd.power}\n温度: ${tempd.batteryTemp}\n时间: ${tempd.durationT}`
  return {tipText: tipText, ...tempd}
}


function _tip80(plotData)
{
  let tempd = plotData.find((d) => d.batteryLevel == 80)
  let tipText = `电压: ${tempd.voltage}\n电流: ${tempd.current}\n功率: ${tempd.power}\n温度: ${tempd.batteryTemp}\n时间: ${tempd.durationT}`
  return {tipText: tipText, ...tempd}
}


function _tip50(plotData)
{
  let tempd = plotData.find((d) => d.batteryLevel == 50)
  let tipText = `电压: ${tempd.voltage}\n电流: ${tempd.current}\n功率: ${tempd.power}\n温度: ${tempd.batteryTemp}\n时间: ${tempd.durationT}`
  return {tipText: tipText, ...tempd}
}


function _plotData(rawBattery,rawData,time0)
{
  var battery_t = rawBattery[0].batteryLevel
  return rawData.filter((d) => d.power > 0).map((d1) => {
    let duration = (d1.time - time0)/1000
    let durationT = `${Math.floor(duration/60)}m${duration%60}s`
    const d2 = rawBattery.find((element) => element.time - d1.time == 0);
    if (d2 !== undefined) {
      battery_t = d2.batteryLevel
    }
    return {duration: duration, durationT: durationT, ...d1, batteryLevel: battery_t};
  })
}


function _plotBattery(rawBattery,time0)
{
  var temp = []
  var preLevel = 0
  for (let d of rawBattery) {
    if (preLevel !== d.batteryLevel && [20,30,40,50,60,70,80,90,95,100].includes(d.batteryLevel)) {
      let duration = (d.time - time0)/1000
      let durationT = `${Math.floor(duration/60)}m${duration%60}s`
      temp.push({duration: duration, durationT: durationT, ...d})
    }
    preLevel = d.batteryLevel
  }
  return temp
}


function _time0(rawData){return(
rawData[0].time
)}

function _rawBattery(d3)
{
  const url = "https://gist.githubusercontent.com/wn2try/95c24454d8649560a865608fd4306865/raw/d06700bbb822cdb353dba9ff99d7c09d8cea8693/231202_201750.csv";
  return fetch(url)
    .then((res) => res.text())
    .then((res) => d3.csvParse(res, d3.autoType));
}


function _rawData(d3)
{
  const url = "https://gist.githubusercontent.com/wn2try/95c24454d8649560a865608fd4306865/raw/d06700bbb822cdb353dba9ff99d7c09d8cea8693/231202_201652.csv";
  return fetch(url)
    .then((res) => res.text())
    .then((res) => d3.csvParse(res, d3.autoType));
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chargingPlot")).define("chargingPlot", ["Plot","plotData","tip50","tip80","tip95","plotBattery"], _chargingPlot);
  main.define("tip95", ["plotData"], _tip95);
  main.define("tip80", ["plotData"], _tip80);
  main.define("tip50", ["plotData"], _tip50);
  main.define("plotData", ["rawBattery","rawData","time0"], _plotData);
  main.define("plotBattery", ["rawBattery","time0"], _plotBattery);
  main.define("time0", ["rawData"], _time0);
  main.define("rawBattery", ["d3"], _rawBattery);
  main.define("rawData", ["d3"], _rawData);
  return main;
}
