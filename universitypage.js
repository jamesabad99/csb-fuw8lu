/*
$(function () {
  $('[name="all-av"], [name="inbox-av"], [name="fav-av"]').change(function () {
    if ($(this).is(":checked")) {
      // Do something...
      console.log("hello");
      $(this).siblings(".filter-btn-label").css("color", "white");
    } else {
      $(this).siblings(".filter-btn-label").css("color", "black");
    }
  });
});

$("#all-reset, #fav-reset, #inbox-reset").click(function () {
  $(".filter-btn-label").css("color", "black");
  $(".filter-check").removeClass("w--redirected-checked");
  $("#all-av").prop("checked", false);
  $("#all-search").val("");
  $("#fav-av").prop("checked", false);
  $("#fav-search").val("");
  $("#inbox-av").prop("checked", false);
  $("#inbox-search").val("");
});
*/

//INBOX PATENTS FILTERS START

const resetButton = document.querySelector('[wized="inbox_reset_button"]');
const input = document.querySelector('[wized="inbox_search_bar"]');

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    myFunction();
  }
});

async function myFunction() {
  const universitiesSearch = input.value;
  await Wized.data.setVariable("inboxsearchvalue", universitiesSearch);
  await Wized.request.execute("Get Inbox Patents"); // Trigger request
}

resetButton.addEventListener("click", cleanInput);
function cleanInput() {
  input.value = "";
}

//INBOX PATENTS FILTERS END

//FAVORITE PATENTS FILTERS START

const resetButton1 = document.querySelector('[wized="favorites_reset_button"]');
const input1 = document.querySelector('[wized="favorites_search_bar"]');

input1.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    myFunction1();
  }
});

async function myFunction1() {
  const universitiesSearch1 = input1.value;
  await Wized.data.setVariable("favoritesearchvalue", universitiesSearch1);
  await Wized.request.execute("Get Favorite Patents"); // Trigger request
}

resetButton1.addEventListener("click", cleanInput1);
function cleanInput1() {
  input1.value = "";
}

//FAVORITE PATENTS FILTERS END

//ALL PATENTS FILTERS START

const resetButton2 = document.querySelector('[wized="all_reset_button"]');
const input2 = document.querySelector('[wized="all_patents_search_bar"]');

input2.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    myFunction2();
  }
});

async function myFunction2() {
  const universitiesSearch2 = input2.value;
  await Wized.data.setVariable("allpatentsearchvalue", universitiesSearch2);
  await Wized.request.execute("Get All Patents"); // Trigger request
}

resetButton2.addEventListener("click", cleanInput2);
function cleanInput2() {
  input2.value = "";
}

//ALL PATENTS FILTERS END

window.onload = async () => {
  Wized.request.await("Get Inbox Patents", (response) => {
    setTimeout(function () {
      //IS LIKED CODE

      $(".feedback_icon-wrapper.is-2.is-liked").on("click", function () {
        $(this).toggleClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-2.is-disliked")
          .removeClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-2.is-maybe")
          .removeClass("active");
      });

      //IS DISLIKED CODE

      $(".feedback_icon-wrapper.is-2.is-disliked").on("click", function () {
        $(this).toggleClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-2.is-liked")
          .removeClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-2.is-maybe")
          .removeClass("active");
      });

      //IS MAYBE CODE

      $(".feedback_icon-wrapper.is-2.is-maybe").on("click", function () {
        $(this).toggleClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-2.is-liked")
          .removeClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-2.is-disliked")
          .removeClass("active");
      });

      // IS MY LIKE

      $(".feedback_icon-wrapper.is-2.is-liked").on("click", function () {
        $(this)
          .closest(".div-block-98")
          .siblings(".div-block-99")
          .find(".patent_feedback-wrapper.is-1")
          .find(".feedback_icon-wrapper.like.is-mine")
          .toggleClass("active");

        $(this)
          .closest(".div-block-98")
          .siblings(".div-block-99")
          .find(".patent_feedback-wrapper.is-2")
          .find(".feedback_icon-wrapper.dislike.is-mine.active")
          .removeClass("active");

        $(this)
          .closest(".div-block-98")
          .siblings(".div-block-99")
          .find(".patent_feedback-wrapper.is-3")
          .find(".feedback_icon-wrapper.maybe.is-mine.active")
          .removeClass("active");
      });

      // IS MY DISLIKE

      $(".feedback_icon-wrapper.is-2.is-disliked").on("click", function () {
        $(this)
          .closest(".div-block-98")
          .siblings(".div-block-99")
          .find(".patent_feedback-wrapper.is-2")
          .find(".feedback_icon-wrapper.dislike.is-mine")
          .toggleClass("active");

        $(this)
          .closest(".div-block-98")
          .siblings(".div-block-99")
          .find(".patent_feedback-wrapper.is-1")
          .find(".feedback_icon-wrapper.like.is-mine.active")
          .removeClass("active");

        $(this)
          .closest(".div-block-98")
          .siblings(".div-block-99")
          .find(".patent_feedback-wrapper.is-3")
          .find(".feedback_icon-wrapper.maybe.is-mine.active")
          .removeClass("active");
      });

      // IS MY MAYBE

      $(".feedback_icon-wrapper.is-2.is-maybe").on("click", function () {
        $(this)
          .closest(".div-block-98")
          .siblings(".div-block-99")
          .find(".patent_feedback-wrapper.is-3")
          .find(".feedback_icon-wrapper.maybe.is-mine")
          .toggleClass("active");

        $(this)
          .closest(".div-block-98")
          .siblings(".div-block-99")
          .find(".patent_feedback-wrapper.is-1")
          .find(".feedback_icon-wrapper.like.is-mine.active")
          .removeClass("active");

        $(this)
          .closest(".div-block-98")
          .siblings(".div-block-99")
          .find(".patent_feedback-wrapper.is-2")
          .find(".feedback_icon-wrapper.dislike.is-mine.active")
          .removeClass("active");
      });

      // Sync Reaction Rows/List
      $(".feedback_icon-wrapper.like").on("click", function () {
        let allPatentsReactionIndex = $(this)
          .closest(".University_Patent_Card")
          .index();
        $(".all-patents-row")
          .find(".row_wrapper_university_page")
          .eq(allPatentsReactionIndex)
          .find(".feedback_icon-wrapper.is-2.is-liked")
          .click();
      });
    }, 1000);
  });

  Wized.request.await("Get Favorite Patents", (response) => {
    setTimeout(function () {
      console.log("It worked");

      //IS LIKED CODE

      $(".feedback_icon-wrapper.is-3.is-liked").on("click", function () {
        $(this).toggleClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-3.is-disliked")
          .removeClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-3.is-maybe")
          .removeClass("active");
      });

      //IS DISLIKED CODE

      $(".feedback_icon-wrapper.is-3.is-disliked").on("click", function () {
        $(this).toggleClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-3.is-liked")
          .removeClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-3.is-maybe")
          .removeClass("active");
      });

      //IS MAYBE CODE

      $(".feedback_icon-wrapper.is-3.is-maybe").on("click", function () {
        $(this).toggleClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-3.is-liked")
          .removeClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-3.is-disliked")
          .removeClass("active");
      });

      // IS MY LIKE

      $(".feedback_icon-wrapper.is-3.is-liked").on("click", function () {
        $(this)
          .closest(".div-block-98-3")
          .siblings(".div-block-99-3")
          .find(".patent_feedback-wrapper.is-1")
          .find(".feedback_icon-wrapper-3.like.is-mine")
          .toggleClass("active");

        $(this)
          .closest(".div-block-98-3")
          .siblings(".div-block-99-3")
          .find(".patent_feedback-wrapper.is-2")
          .find(".feedback_icon-wrapper-3.dislike.is-mine.active")
          .removeClass("active");

        $(this)
          .closest(".div-block-98-3")
          .siblings(".div-block-99-3")
          .find(".patent_feedback-wrapper.is-3")
          .find(".feedback_icon-wrapper-3.maybe.is-mine.active")
          .removeClass("active");
      });

      // IS MY DISLIKE

      $(".feedback_icon-wrapper.is-3.is-disliked").on("click", function () {
        $(this)
          .closest(".div-block-98-3")
          .siblings(".div-block-99-3")
          .find(".patent_feedback-wrapper.is-2")
          .find(".feedback_icon-wrapper-3.dislike.is-mine")
          .toggleClass("active");

        $(this)
          .closest(".div-block-98-3")
          .siblings(".div-block-99-3")
          .find(".patent_feedback-wrapper.is-1")
          .find(".feedback_icon-wrapper-3.like.is-mine.active")
          .removeClass("active");

        $(this)
          .closest(".div-block-98-3")
          .siblings(".div-block-99-3")
          .find(".patent_feedback-wrapper.is-3")
          .find(".feedback_icon-wrapper-3.maybe.is-mine.active")
          .removeClass("active");
      });

      // IS MY MAYBE

      $(".feedback_icon-wrapper.is-3.is-maybe").on("click", function () {
        $(this)
          .closest(".div-block-98-3")
          .siblings(".div-block-99-3")
          .find(".patent_feedback-wrapper.is-3")
          .find(".feedback_icon-wrapper-3.maybe.is-mine")
          .toggleClass("active");

        $(this)
          .closest(".div-block-98-3")
          .siblings(".div-block-99-3")
          .find(".patent_feedback-wrapper.is-1")
          .find(".feedback_icon-wrapper-3.like.is-mine.active")
          .removeClass("active");

        $(this)
          .closest(".div-block-98-3")
          .siblings(".div-block-99-3")
          .find(".patent_feedback-wrapper.is-2")
          .find(".feedback_icon-wrapper-3.dislike.is-mine.active")
          .removeClass("active");
      });
    }, 1000);
  });

  Wized.request.await("Get All Patents", (response) => {
    setTimeout(function () {
      console.log("It worked");

      //IS LIKED CODE

      $(".feedback_icon-wrapper.is-4.is-liked").on("click", function () {
        $(this).toggleClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-4.is-disliked")
          .removeClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-4.is-maybe")
          .removeClass("active");
      });

      //IS DISLIKED CODE

      $(".feedback_icon-wrapper.is-4.is-disliked").on("click", function () {
        $(this).toggleClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-4.is-liked")
          .removeClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-4.is-maybe")
          .removeClass("active");
      });

      //IS MAYBE CODE

      $(".feedback_icon-wrapper.is-4.is-maybe").on("click", function () {
        $(this).toggleClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-4.is-liked")
          .removeClass("active");
        $(this)
          .siblings(".feedback_icon-wrapper.is-4.is-disliked")
          .removeClass("active");
      });

      // IS MY LIKE

      $(".feedback_icon-wrapper.is-4.is-liked").on("click", function () {
        $(this)
          .closest(".div-block-98-4")
          .siblings(".div-block-99-4")
          .find(".patent_feedback-wrapper.is-1")
          .find(".feedback_icon-wrapper-4.like.is-mine")
          .toggleClass("active");

        $(this)
          .closest(".div-block-98-4")
          .siblings(".div-block-99-4")
          .find(".patent_feedback-wrapper.is-2")
          .find(".feedback_icon-wrapper-4.dislike.is-mine.active")
          .removeClass("active");

        $(this)
          .closest(".div-block-98-4")
          .siblings(".div-block-99-4")
          .find(".patent_feedback-wrapper.is-3")
          .find(".feedback_icon-wrapper-4.maybe.is-mine.active")
          .removeClass("active");
      });

      // IS MY DISLIKE

      $(".feedback_icon-wrapper.is-4.is-disliked").on("click", function () {
        $(this)
          .closest(".div-block-98-4")
          .siblings(".div-block-99-4")
          .find(".patent_feedback-wrapper.is-2")
          .find(".feedback_icon-wrapper-4.dislike.is-mine")
          .toggleClass("active");

        $(this)
          .closest(".div-block-98-4")
          .siblings(".div-block-99-4")
          .find(".patent_feedback-wrapper.is-1")
          .find(".feedback_icon-wrapper-4.like.is-mine.active")
          .removeClass("active");

        $(this)
          .closest(".div-block-98-4")
          .siblings(".div-block-99-4")
          .find(".patent_feedback-wrapper.is-3")
          .find(".feedback_icon-wrapper-4.maybe.is-mine.active")
          .removeClass("active");
      });

      // IS MY MAYBE

      $(".feedback_icon-wrapper.is-4.is-maybe").on("click", function () {
        $(this)
          .closest(".div-block-98-4")
          .siblings(".div-block-99-4")
          .find(".patent_feedback-wrapper.is-3")
          .find(".feedback_icon-wrapper-4.maybe.is-mine")
          .toggleClass("active");

        $(this)
          .closest(".div-block-98-4")
          .siblings(".div-block-99-4")
          .find(".patent_feedback-wrapper.is-1")
          .find(".feedback_icon-wrapper-4.like.is-mine.active")
          .removeClass("active");

        $(this)
          .closest(".div-block-98-4")
          .siblings(".div-block-99-4")
          .find(".patent_feedback-wrapper.is-2")
          .find(".feedback_icon-wrapper-4.dislike.is-mine.active")
          .removeClass("active");
      });
    }, 1000);
  });
};
