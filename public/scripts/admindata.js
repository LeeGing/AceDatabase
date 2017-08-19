  function createDataElement(tweetData){
      const html = 
        ` <tr>
            <td>DATE</td>
            <td>ORDER ID</td>
            <td>ITEMS</td>
            <td>PRICE</td>
          </tr>`;
        return html;
  }

//This following function appends the outcome of the function from app.js.
  function renderData(admindb){
    admindb.forEach(function (data) {
      $('.admintable.tr').prepend (createDataElement(data));
    });
  }

  //Retreives the JSON from /tweets and renders it in renderTweets.
  function loadData(){
    $.getJSON('/', renderData) 
  }
