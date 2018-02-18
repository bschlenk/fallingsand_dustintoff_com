module.exports = function(context) {
  const world = parseContents(context);
  return `module.exports = ${JSON.stringify(world)}`;
};

function parseContents(contents) {
  let txt = contents;
  const world = {
    elements: [],
    player: null,
  };
  const { elements } = world;

  while (txt !== '') {
    let x;
    let y;
    let width;
    let height;
    let type;
    let shape;
    let positioning;

    txt = txt.substring(txt.indexOf('<') + 1);

    const tagType = txt.substring(0, txt.indexOf(' '));
    txt = txt.substring(txt.indexOf(' ') + 1);
    if (tagType === 'elem') {
      while (txt.indexOf('>') !== 0) {
        const property = txt.substring(0, txt.indexOf('='));
        txt = txt.substring(txt.indexOf('="') + 2);
        const next = txt.indexOf('"');

        if (property=='shape')
            shape = txt.substring(0, next);
        else if (property=='x')
            x = parseFloat(txt.substring(0, next));
        else if (property=='y')
            y = parseFloat(txt.substring(0, next));
        else if (property=='width')
            width = parseFloat(txt.substring(0, next));
        else if (property=='height')
            height = parseFloat(txt.substring(0, next));
        else if (property=='type')
            type = txt.substring(0, next);
        else if (property=='position')
            positioning = txt.substring(0, next);

        txt = txt.substring(next + 1);
        while (txt.indexOf(' ') === 0
            || txt.indexOf('\t') === 0
            || txt.indexOf('\n') === 0) {
          txt = txt.substring(1);
        }
      }

      elements.push({
        shape,
        x,
        y,
        width,
        height,
        type,
        positioning,
      });
    } else if (tagType === 'player') {
      while (txt.indexOf('>')!=0) {
        const property = txt.substring(0, txt.indexOf('='));
        txt = txt.substring(txt.indexOf('="') + 2);
        var next = txt.indexOf('"');

        if (property=='x')
            x = parseFloat(txt.substring(0, next));
        else if (property=='y')
            y = parseFloat(txt.substring(0, next));
        else if (property=='position')
            positioning = txt.substring(0, next);

        txt = txt.substring(next + 1);
        while (txt.indexOf(' ') === 0
            || txt.indexOf('\t') === 0
            || txt.indexOf('\n') === 0) {
          txt = txt.substring(1);
        }
      }
      world.player = { x, y, positioning };
    }

    txt = txt.substring(txt.indexOf('>')+1);
  }

  return world;
};
