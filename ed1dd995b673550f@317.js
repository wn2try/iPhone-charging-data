function _1(md){return(
md`# iPhone 15 Pro 充电数据 -- 小米35w + 苹果3a线`
)}

function _chargingPlot(Plot,plotData,tip50,tip90,tip100,tipMinPower,plotBattery){return(
Plot.plot({
  width: 1200,
  height: 660,
  marginLeft: 40,
  marginRight: 50,
  marginBottom: 30,
  marginTop: 20,
  x: { axis: null, transform: (d) => d/60, domain: [0,115] },
  y: { axis: null },
  marks: [
    Plot.ruleX(plotData, Plot.pointerX({x: "duration", py: 10, stroke: "black"})),
    Plot.text(plotData, Plot.pointerX({x: "duration", dy: 20, frameAnchor: "top-left", text: (d) => [`  电量: ${d.batteryLevel}%`, `  电压: ${d.voltage}`, `  电流: ${d.current}`, `  功率: ${d.power}`, `  温度: ${d.batteryTemp}`, `  时间: ${d.durationT}`].join(`\n`)})),
    Plot.tip([tip50.tipText], {x: tip50.duration, anchor: "bottom", dy: -140, textPadding: 4, strokeOpacity: 0.3}),
    Plot.tip([tip90.tipText], {x: tip90.duration, anchor: "top", dy: -110, textPadding: 4, strokeOpacity: 0.3}),
    Plot.tip([tip100.tipText], {x: tip100.duration, anchor: "top", dy: -110, textPadding: 4, strokeOpacity: 0.3}),
    Plot.tip([tipMinPower.tipText], {x: tipMinPower.duration, anchor: "left", dy: 122, textPadding: 4, strokeOpacity: 0.3}),
    () => Plot.plot({
      marks: [
        Plot.lineY(plotData, { x: "duration", y: "batteryTemp", stroke: "darkred" }),
      ],
        x: { axis: "top", transform: (d) => d/60, domain: [0,115], line: true, label: "时间（分钟）", labelArrow: false },
        y: { domain: [22,38], ticks: 6, tickSize: 5, inset: true, line: true, nice: true, label: "电池温度（℃）", labelAnchor: "center", labelArrow: false },
      width: 1200,
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
        x: { axis: null, transform: (d) => d/60, domain: [0,115] },
        y: { label: "电量（%）", labelAnchor: "center", labelArrow: false, nice: true },
      width: 1200,
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
      x: { axis: null, transform: (d) => d/60, domain: [0,115] },
      y: { domain: [0,25], ticks: 10, tickSize: 5, inset: true, line: true, nice: true, label: "功率（W）", labelAnchor: "center", labelArrow: false },
      width: 1200,
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
      x: { axis: null, transform: (d) => d/60, domain: [0,115] },
      y: { domain: [4,9], ticks: 5, tickSize: 5, inset: true, line: true, label: "电压（V）", labelAnchor: "center", labelArrow: false, nice: true},
      width: 1200,
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
      x: { transform: (d) => d/60, domain: [0,115], label: "时间（分钟）", labelArrow: false },
      y: { domain: [0,3], ticks: 4, tickSize: 5, inset: true, line: true, label: "电流（A）", labelAnchor: "center", labelArrow: false, nice: true},
      width: 1200,
      height: 660,
      marginLeft: 40,
      marginRight: 50,
      marginBottom: 30,
      marginTop: 580,   
    }),
  ]
})
)}

function _tipMinPower(plotData,d3)
{
  let tempd = plotData.find((d) => d.power == d3.min(plotData, (e) => e.power))
  let tipText = `电量: ${tempd.batteryLevel}%\n电压: ${tempd.voltage}\n电流: ${tempd.current}\n功率: ${tempd.power}\n温度: ${tempd.batteryTemp}\n时间: ${tempd.durationT}`
  return {tipText: tipText, ...tempd}
}


function _tip100(plotData)
{
  let tempd = plotData.find((d) => d.batteryLevel == 100)
  let tipText = `电压: ${tempd.voltage}\n电流: ${tempd.current}\n功率: ${tempd.power}\n温度: ${tempd.batteryTemp}\n时间: ${tempd.durationT}`
  return {tipText: tipText, ...tempd}
}


function _tip90(plotData)
{
  let tempd = plotData.find((d) => d.batteryLevel == 90)
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
    if (preLevel !== d.batteryLevel && [20,30,40,50,60,70,80,90,100].includes(d.batteryLevel)) {
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
  const url = "https://gist.githubusercontent.com/wn2try/8d4dd50819791825e5b365d8acdb1f80/raw/b67c67fc397faadb43bf5f8f558b9f2d6212bbc8/231120_185937.csv";
  return fetch(url)
    .then((res) => res.text())
    .then((res) => d3.csvParse(res, d3.autoType));
}


function _voltageComp(Plot,rawData,rawHuawei,tip222){return(
Plot.plot({
  x: {line: true, nice: true, label: "电流（A）", labelArrow: false, labelAnchor: "center"},
  y: {domain: [4,9], grid: true, line: true, nice: true, label: "电压（V）", labelAnchor: "center", labelArrow: false},
  marks: [
    Plot.dot(rawData, { filter: (d) => d.power > 0, x: "current", y: "voltage", r: 2, symbol: "circle", stroke: "darkcyan", strokeWidth: 0.8, tip: {anchor: "top-right", textPadding: 4, strokeOpacity: 0.1, fill: "darkcyan", fillOpacity: 0.1}, title: (d) => `苹果3A线 ○\n电压：${d.voltage}V\n电流：${d.current}A`}),
    Plot.dot(rawHuawei, { filter: (d) => d.power > 0, x: "current", y: "voltage", r: 2, symbol: "triangle2", stroke: "darkgoldenrod", strokeWidth: 0.8, tip: {anchor: "top-left", textPadding: 4, strokeOpacity: 0.1, fill: "darkgoldenrod", fillOpacity: 0.1}, title: (d) => `华为3A线 △\n电压：${d.voltage}V\n电流：${d.current}A` }),
    Plot.ruleY([0]),
    Plot.dotY(["华为3A线"], {x: 2.7, y: 4.4, symbol: "triangle2", stroke: "darkgoldenrod"}),
    Plot.text(["  华为3A线"], {x: 2.7, y: 4.4, textAnchor: "start"}),
    Plot.dotY(["苹果3A线"], {x: 2.7, y: 4.2, symbol: "circle", stroke: "darkcyan"}),
    Plot.text(["  苹果3A线"], {x: 2.7, y: 4.2, textAnchor: "start"}),
    Plot.text(["  苹果3A线"], {x: 2.7, y: 4.2, textAnchor: "start"}),
    Plot.ruleX([2.22], {stroke: "grey", strokeOpacity: 0.8}),
    Plot.tip([tip222], {x: 2.22, y: 8.3, anchor: "top-right", textPadding: 6, strokeOpacity: 0.3, lineHeight: 1.5}),
  ]
})
)}

function _tip222(rawHuawei,d3,rawData)
{
  let tempd = rawHuawei.filter((d) => d.current == 2.22)
  let mean = d3.mean(tempd, (d) => d.voltage)
  let min = d3.min(tempd, (d) => d.voltage)
  let max = d3.max(tempd, (d) => d.voltage)
  let tempd1 = rawData.filter((d) => d.current == 2.22)
  let mean1 = d3.mean(tempd1, (d) => d.voltage)
  let min1 = d3.min(tempd1, (d) => d.voltage)
  let max1 = d3.max(tempd1, (d) => d.voltage)
  return `电压(V) Mean (Min ~ Max) @2.22A\n-- 华为线：${d3.format(".2f")(mean)} (${min} ~ ${max})\n-- 苹果线：${d3.format(".2f")(mean1)} (${d3.format(".2f")(min1)} ~ ${max1})`
}


function _rawData(d3)
{
  const url = "https://gist.githubusercontent.com/wn2try/43827c539527ad425235b3c8489f8205/raw/f121fd4609aa167783bcadad7c5627ab739b8c2d/231120_185901.csv";
  return fetch(url)
    .then((res) => res.text())
    .then((res) => d3.csvParse(res, d3.autoType));
}


function _rawHuawei(d3)
{
  const url = "https://gist.githubusercontent.com/wn2try/662720310620b529fa5ff469f3e58a77/raw/cdf639c27a1b2f0f062ceda097dfb672b50ef692/231117_155230.csv";
  return fetch(url)
    .then((res) => res.text())
    .then((res) => d3.csvParse(res, d3.autoType));
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chargingPlot")).define("chargingPlot", ["Plot","plotData","tip50","tip90","tip100","tipMinPower","plotBattery"], _chargingPlot);
  main.define("tipMinPower", ["plotData","d3"], _tipMinPower);
  main.define("tip100", ["plotData"], _tip100);
  main.define("tip90", ["plotData"], _tip90);
  main.define("tip50", ["plotData"], _tip50);
  main.define("plotData", ["rawBattery","rawData","time0"], _plotData);
  main.define("plotBattery", ["rawBattery","time0"], _plotBattery);
  main.define("time0", ["rawData"], _time0);
  main.define("rawBattery", ["d3"], _rawBattery);
  main.variable(observer("voltageComp")).define("voltageComp", ["Plot","rawData","rawHuawei","tip222"], _voltageComp);
  main.define("tip222", ["rawHuawei","d3","rawData"], _tip222);
  main.define("rawData", ["d3"], _rawData);
  main.define("rawHuawei", ["d3"], _rawHuawei);
  return main;
}
