export class SampleSrv {
  constructor ($html) {
    this.$html = $html;
  }
  getData () {
    return this.$html.get('http://www.example.com').then(res => {
      return res.data;
    });
  }
}
