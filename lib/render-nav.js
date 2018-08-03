module.exports = function renderNav(groupedFiles, level = 0) {
  var list, listc, sublist, sublistc, leaf, leafc

  if (level === 0) {
    list = '<ul class="navbar-nav ml-auto">'
    listc = '</ul>'
    leaf = `<li class="nav-item"><a class="nav-link" href="`
    leafc = '</a></li>'
  } else {
    leaf = `<a class="dropdown-item" href="`
    leafc = '</a>'
    if (level === 1) {
      list = '<div class="dropdown-menu">'
      listc = '</div>'
    } else {
      list = ''
      listc = ''
    }
  }

  return `${list}
${groupedFiles
  .map(f => {
    if (Array.isArray(f)) {
      if (level === 0) {
        return `<li class="nav-item dropdown">
<a class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false" role="button" aria-haspopup="true" href="#">${f[0]}</a>\n${renderNav(
          f[1],
          level + 1
        )}</li>`;
      } else {
        return `<div class="dropdown-divider"></div>\n${f[0]}\n${renderNav(
          f[1],
          level + 1
        )}`;
      }
    } else {
      //  LEAF

      // Skip index files on nested levels since the Heading links to them.
      if (level > 0 && f.text && f.text.toLowerCase() === "index") return;

      return `${leaf}${f.href}">${f.text}${leafc}`;
    }
  })
  .join("\n")}
${listc}`;
};

function getIndexFile(files) {
  return files.find(e => !Array.isArray(e) && e.text === "index");
}
