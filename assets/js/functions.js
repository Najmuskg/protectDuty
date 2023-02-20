// conflict bugg solution
var $ = jQuery.noConflict();

$(function () {

  /* Show Header when scroll up */
  /* ------------------------------------------- */
  var lastScrollTop = 0;
  var $header = $("header");
  var headerHeight = $header.outerHeight();

  $(window).scroll(function () {
    var windowTop = $(window).scrollTop();

    if (windowTop >= headerHeight) {
      $header.addClass("header-sticky");
    } else {
      $header.removeClass("header-sticky");
      $header.removeClass("header-show");
    }

    if ($header.hasClass("header-sticky")) {
      if (windowTop < lastScrollTop) {
        $header.addClass("header-show");
      } else {
        $header.removeClass("header-show");
      }
    }
    lastScrollTop = windowTop;
  });



 /*========== Footer Menu Slide Mobile =========*/

  if ($(window).width() < 768) {
    $(".filters--title").on("click", function () {
      $(this).toggleClass("filter-open");
      $(this).siblings(".filters--list").slideToggle("slow");
    });

    $(".footer--title").on("click", function (e) {
      e.preventDefault();
      $(this).siblings(".footer--menu").slideToggle("slow");
    });

    $(".scroller__title").on("click", function () {
      $(this).toggleClass("scroll-nav-open");
      $(this).siblings(".scroller__nav").slideToggle();
    });
  }/*========== End Of Footer Menu Slide Mobile =========*/


  /* Parallax Effect on scroll */
  /* ------------------------------------------- */
  $(".jarallax").jarallax();

  /* Parallax Scroll */
  /* ------------------------------------------- */
  $(window).on("load scroll", function () {
    var parallaxElement = $(".parallax_scroll"),
      parallaxQuantity = parallaxElement.length;
    window.requestAnimationFrame(function () {
      for (var i = 0; i < parallaxQuantity; i++) {
        var currentElement = parallaxElement.eq(i),
          windowTop = $(window).scrollTop(),
          elementTop = currentElement.offset().top,
          elementHeight = currentElement.height(),
          viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
          scrolled = windowTop - elementTop + viewPortHeight;
        currentElement.css({
          transform: "translate3d(0," + scrolled * -0.15 + "px, 0)",
        });
      }
    });
  });
  // End of Parallax Scroll

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    /* # of pixels before element*/
    var detectAreaTopOffset = 15;
    /* # of pixels after element*/
    var detectAreaBottomOffset = 100;
    return (
      elemTop <= docViewBottom + detectAreaTopOffset &&
      elemBottom >= docViewTop - detectAreaBottomOffset
    );
  }
  //Count up code
  function countUp() {
    $(".counter").each(function () {
      var $this = $(this), // <- Don't touch this variable. It's pure magic.
        countTo = $this.attr("data-count");
      ended = $this.attr("ended");

      if (ended != "true" && isScrolledIntoView($this)) {
        $({ countNum: $this.text() }).animate(
          {
            countNum: countTo,
          },
          {
            duration: 2500, //duration of counting
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
        $this.attr("ended", "true");
      }
    });
  }
  //Start animation on page-load
  countUp();

  $(document).scroll(function () {
    if ($(".counter").length) {
      if (isScrolledIntoView(".counter")) {
        countUp();
      }
    }
  });
  // End of Counter up

  /* Custom Tabs */
  /* ------------------------------------------- */

  $("#tabs li:first-child").addClass("current");
  $("#tab-content > div:first-child").addClass("current");

  $("#tabs li a").click(function (e) {
    $("#tabs li, #tab-content .current").removeClass("current");
    $(this).parent().addClass("current");
    var currentTab = $(this).attr("href");
    $(currentTab).addClass("current");
    if ($(window).width() >= 700) {
      e.preventDefault();
    }
  });

  // End of Tabs

  var inf_scrll = jQuery(".next");
  //console.log(inf_scrll.length);
  if (inf_scrll.length) {
    var infScroll = new InfiniteScroll(".ctal-item--container", {
      // the wrapper/container
      path: ".next",
      append: ".grid__items",
      // append: ".news",
      status: ".page-load-status",
      hideNav: ".pagination",
      // load pages on button click - switch scrollThreshold to FALSE
      button: ".load-more",
      scrollThreshold: false,
      history: false,
      // status: ".page-load-status",
    });

    // Do stuff when new items arrive
    var $container = jQuery(".ctal-item--container");
    $container.on(
      "append.infiniteScroll",
      function (event, response, path, items) {
        const scrollers = document.querySelectorAll("[data-scroll]");
        const observer = new IntersectionObserver(check);
        scrollers.forEach((scroller) => observer.observe(scroller));
      }
    );
  }
  // ENd of

});

/* window load class helper */
/* ------------------------------------------- */
$(window).on("load", function () {
  // setTimeout(function () {
  $("html").removeClass("loading").addClass("loaded");
  // }, 10000);
});

/* manually doing in-view stuff */
/* ------------------------------------------- */

const scrollers = document.querySelectorAll("[data-scroll]");

function check(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}

const observer = new IntersectionObserver(check);
scrollers.forEach((scroller) => observer.observe(scroller));

