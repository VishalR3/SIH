

$(function() {
  setHeight();
  setStyle();
  $("#prev_comments").on("click",".comment-area",function() {
    $(this)
      .children(".sentiments")
      .slideToggle();
  });

  $("#analyze_btn").click(function(event) {
    let data = $("#input").val();
    if (data != "") {
      let result = getSentiment();
      let commentArea = document.createElement("div");
      let comment = document.createElement("div");
      let sentiments = document.createElement("div");
      commentArea.className = "comment-area";
      comment.className = "comment";
      sentiments.className = "sentiments";
      commentArea.setAttribute("sentiment", result);
      comment.innerHTML = data;
      sentiments.innerHTML = result;
      commentArea.append(comment, sentiments);
      $("#prev_comments").prepend(commentArea);
      setStyle();
    }
    event.preventDefault();
  });

  createChart();
});
function getSentiment() {
  let val = Math.floor(Math.random() * 3);
  switch (val) {
    case 0: countComments(val);
      return "bad";
      break;
    case 1: countComments(val);
      return "good";
      break;
    default: countComments(val);
      return "indeterminate";
      break;
  }
}
function countComments(data){
  let total=parseInt($(".total_comment").text());
  let good=parseInt($(".good_comment").text());
  let bad=parseInt($(".bad_comment").text());
  let other=parseInt($(".other_comment").text());
  switch(data){
    case 0: total++;
              bad++;
              break;
    case 1: total++;
              good++;
              break;
    default: total++;
              other++;
              break;
  }
  $(".total_comment").text(total);
  $(".good_comment").text(good);
  $(".bad_comment").text(bad);
  $(".other_comment").text(other);
  createChart(good,bad,other);
  
}
function setHeight() {
  let height = $("#comment_form").height();
  $("#comment_status").height(height);
}
function setStyle() {
  $(".comment-area").each(function() {
    let sentiment = $(this).attr("sentiment");
    switch (sentiment) {
      case "bad":
        $(this).css({
          backgroundColor: "rgba(200,0,0,0.3)",
          borderColor: "rgba(255,0,0,1)"
        });
        $(this)
          .children(".sentiments")
          .css({
            backgroundColor: "rgba(200,0,0,0.1)"
          });
        break;
      case "good":
        $(this).css({
          backgroundColor: "rgba(0,200,0,0.3)",
          borderColor: "rgba(0,200,0,1)"
        });
        $(this)
          .children(".sentiments")
          .css({
            backgroundColor: "rgba(0,200,0,0.1)"
          });
        break;
      default:
        $(this).css({
          backgroundColor: "rgba(0,0,200,0.3)",
          borderColor: "rgba(0,0,200,1)"
        });
        $(this)
          .children(".sentiments")
          .css({
            backgroundColor: "rgba(0,0,200,0.1)"
          });
        break;
    }
  });
}
function createChart(good=5347,bad=1244,other=1391) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Good", "Bad", "Undetermined"],
      datasets: [
        {
          label: "# of Sentimental Responses",
          data: [good,bad,other],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}
