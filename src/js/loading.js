const doc = document,
  types = [
    "circle",
    "semi-circle",
    "square",
    "triangle",
    "triangle-2",
    "rectangle",
  ],
  colors = [
    "#836ee5",
    "#fe94b4",
    "#49d2f5",
    "#ff5354",
    "#00b1b4",
    "#ffe465",
    "#0071ff",
    "#03274b",
  ];

let shapes = doc.querySelectorAll("shape");

shapes.forEach((shape, index) => {
  setInterval(() => {
    let cl = shape.classList;
    shape.className = "";

    //assign styles
    cl.add(types[~~(Math.random() * types.length)]);
    let offset = Math.random() * 4 - 2;
    let opp = offset >= 0 ? "+ " : "- ";
    let styles = [
      ["left", "calc(50% " + opp + offset + "vw)"],
      ["--bounce-variance", Math.random() * 20 - 10 + "vh"],
      ["--base_scale", Math.random() * 6 + 4 + "vh"],
      ["--rotation", Math.random() * 180 - 90 + "deg"],
      ["--color", colors[~~(Math.random() * colors.length)]],
    ];
    styles.forEach((style) => shape.style.setProperty(style[0], style[1]));

    //animate
    if (!cl.contains("bounce-up")) cl.add("bounce-up");
    cl.replace("bounce-down", "bounce-up");
    setTimeout(() => cl.replace("bounce-up", "bounce-down"), 400);
  }, 740);
});
