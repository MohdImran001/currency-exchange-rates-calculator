exports.html = () => {
	return `
  <h1 class="ui header">Historical Rates</h1>
  <hr>
  <form class="ui form">
    <div class="field">
      <label>Pick Date</label>
      <div class="ui calendar" id="calendar">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" placeholder="Date" id="date">
        </div>
      </div>
    </div>
    <div class="ui primary submit button">Fetch Rates</div>
    <div class="ui error message"></div>
  </form>

  <div class="ui basic segment">
    <div id="historical-table"></div>
  </div>
	`
}