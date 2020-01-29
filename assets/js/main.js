$(function() {
  function setHeight() {
    let height = $("#comment_form").height();
    $("#comment_status").height(height);
  }
  setHeight();
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
          default:$(this).css({
            backgroundColor: "rgba(0,0,200,0.3)",
            borderColor: "rgba(0,0,200,1)"
          });
          $(this)
            .children(".sentiments")
            .css({
              backgroundColor: "rgba(0,0,200,0.1)"
            });
          break;;
      }
    });
  }
  setStyle();
  $(".comment-area").click(function() {
    $(this)
      .children(".sentiments")
      .slideToggle();
  });

  $("#analyze_btn").click(function(event) {
    let data = $("#input").val();
    if (data != "") {
      let result = "bad";
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
      $("#prev_comments").append(commentArea);
      setStyle();
    }
    event.preventDefault();
  });

  function createChart() {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Good", "Bad", "Undetermined"],
        datasets: [
          {
            label: "# of Sentimental Responses",
            data: [5347,1244,1391],
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
  createChart();
});
