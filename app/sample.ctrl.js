export class SampleCtrl {
  constructor ($scope) {
    this.$scope = $scope;
  }
  _init () {
    this.$scope.title = 'some foo title';
  }
}
