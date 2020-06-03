exports.html = () => {
	return `
  <h1 class="ui header">Exchange Rate</h1>
  <hr>
  <div class="ui basic loading segment">
    <form class="ui form">
      <div class="three fields">
        <div class="field">
          <label>From</label>
          <select class="ui dropdown" name="from" id="from">
            <option value="">Select Currency</option>
            {{#each symbols}}
              <option value="{{@key}}">{{this}}</option>
            {{/each}}
          </select>
        </div>
        <div class="field">
          <label>To</label>
          <select class="ui dropdown" name="to" id="to">
            <option value="">Select Currency</option>
            {{#each symbols}}
              <option value="{{@key}}">{{this}}</option>
            {{/each}}
          </select>
        </div>
        <div class="field">
          <label>Amount</label>
          <input type="number" name="amount" id="amount" placeholder="Enter amount">
        </div>
      </div>
      <div class="ui primary submit button">Convert</div>
      <div class="ui error message"></div>
    </form>
    <br>
    <div id="result-segment" class="ui center aligned segment">
      <h2 id="result" class="ui header">
        0.00
      </h2>
    </div>
  </div>
	`
}