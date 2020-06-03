exports.html = () => {
return `
  <h1 class="ui header">Currency Rates</h1>
  <hr>
  <div class="ui loading basic segment">
    <div class="ui horizontal list">
      <div class="item">
        <i class="calendar alternate outline icon"></i>
        <div class="content">
          <div class="ui sub header">Date</div>
          <span>{{date}}</span>
        </div>
      </div>
      <div class="item">
        <i class="money bill alternate outline icon"></i>
        <div class="content">
          <div class="ui sub header">Base</div>
          <span>{{base}}</span>
        </div>
      </div>
    </div>

    <table class="ui celled striped selectable inverted table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {{#each rates}}
        <tr>
          <td>{{@key}}</td>
          <td>{{this}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
  </div>
`
}