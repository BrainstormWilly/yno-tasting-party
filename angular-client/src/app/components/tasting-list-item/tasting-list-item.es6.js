export const template = `
<div class="wrapper" href="#">
  <div class="date">
    <span>{{$ctrl.openDate()}}</span>
    <span>{{$ctrl.openTime()}}</span>
  </div>
  <div class="title">
    <span>{{$ctrl.tasting.name}}</span>
    <span>- hosted by {{$ctrl.tasting.host.name}}</span>
  </div>
</div>
`
