export default function gotoPage(param) {
  this.eventBus.emit('gotoPage', param);
}
