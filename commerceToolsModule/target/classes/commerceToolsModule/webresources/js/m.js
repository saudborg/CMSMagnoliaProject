// Generated by CoffeeScript 1.10.0
var Scroll, checkScrollingPosition, config, filterNonActive, generateCaptcha, getEstimatedCosts, getLocalStorage, getRangeSliderTemplate, getRevenueValue, hasLocalStorage, initFadingCycleCarousel, jumpToTop, number_format, prettifyCode, removeLocalStorage, setLocalStorage, startsWith, toggleCollapseIcons, toggleEstimatedOverview, updateEstimatedOverview, verifyCaptcha;

Scroll = function(options) {
  var scroll;
  scroll = this;
  scroll.a = 0;
  scroll.el = options.el;
  return $(window).on('scroll resize', function() {
    var i, j, l, point, ref, ref1, size;
    size = scroll.el.length;
    for (i = j = 0, ref = size - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      point = scroll.getCurrentSlidePoint(scroll.el, i);
      scroll.by(point.y, point.down, point.up);
    }
    for (i = l = 0, ref1 = size - 2; 0 <= ref1 ? l <= ref1 : l >= ref1; i = 0 <= ref1 ? ++l : --l) {
      point = scroll.getNextSlidePoint(scroll.el, i);
      scroll.by(point.y, point.down, point.up);
    }
    return scroll.a = scroll.b;
  });
};

Scroll.prototype.by = function(y, down, up) {
  var a, b;
  a = this.a;
  b = this.b = ($('body').scrollTop() || $('html').scrollTop()) + 80;
  y = y();
  if (b <= y && a > y) {
    return down();
  } else if (b > y && a <= y) {
    return up();
  }
};

Scroll.prototype.getNextSlidePoint = function(el, i) {
  var point;
  return point = {
    y: function() {
      return el.eq(i + 1).position().top - 1;
    },
    up: function() {
      return el.eq(i).removeClass('sticky');
    },
    down: function() {
      return el.eq(i).addClass('sticky');
    }
  };
};

Scroll.prototype.getCurrentSlidePoint = function(el, i) {
  var point;
  return point = {
    y: function() {
      return el.eq(i).position().top - 1;
    },
    up: function() {
      return el.eq(i).addClass('sticky');
    },
    down: function() {
      return el.eq(i).removeClass('sticky');
    }
  };
};

hasLocalStorage = function() {
  return !!window["localStorage"];
};

getLocalStorage = function(key) {
  if (this.hasLocalStorage()) {
    return window["localStorage"].getItem(key);
  }
};

setLocalStorage = function(key, value) {
  if (this.hasLocalStorage()) {
    return window["localStorage"].setItem(key, value);
  }
};

removeLocalStorage = function(key) {
  if (this.hasLocalStorage()) {
    return window["localStorage"].removeItem(key);
  }
};

config = void 0;

jumpToTop = $("#jump-to-top");

checkScrollingPosition = function() {
  var isNearTop;
  isNearTop = $(window).scrollTop() < 100;
  if (isNearTop) {
    return jumpToTop.removeClass("appear");
  } else {
    return jumpToTop.addClass("appear");
  }
};

setInterval(checkScrollingPosition, 100);

$(document).ready(function() {
  var $blogDetailView, $document, $window, bindTooltip, categoryId, changeLangInUrl, changePage, changePricingPlan, createdAt, currentLang, currentPlan, destroyTooltip, fadingInterval, footer, hash, initTooltip, initializePricingSlider, isIe, mainContent, message, modal, nameLang, pixelCounter, scrollToTarget, sidebar, slider, sliders, tag, targetElement, targetName, timeout, tooltipClicked;
  isIe = $("meta[name=isie]").size() > 0;
  tag = $("body").data("tag");
  $("#" + tag).addClass("active");
  if (Modernizr.touch) {
    $("#helpContact").hide();
  }
  $('iframe.json-schema').iFrameResize();
  $.getJSON("/config.json", function(data) {
    var disqus_shortname, rewrite;
    config = data;
    if (data.rewriteLinks) {
      rewrite = function(from, to) {
        return function(index, el) {
          var href;
          el = $(el);
          href = el.attr("href").replace(from, to);
          return el.attr("href", href);
        };
      };
      $("*[data-rewrite=true]").each(function(index, el) {
        return rewrite(data.sphereDefaultDomain, data.sphereNetDomain)(index, el);
      });
      $("*[data-rewrite-dev=true]").each(function(index, el) {
        return rewrite(data.sphereDevDomain, data.sphereDevUrl)(index, el);
      });
    }
    if (tag === "dev") {
      disqus_shortname = data.disqusShortName;
      return (function() {
        var dsq;
        dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        return (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      })();
    }
  });
  if (tag === "dev") {
    $('#liveHipchat').hipChatPanel({
      url: 'https://www.hipchat.com/gCOStFSHE',
      timezone: 'CEST'
    });
  }
  if (tag !== "dev") {
    changeLangInUrl = function(targetLang) {
      var targetUrl;
      if (window.location.pathname === "/") {
        targetUrl = "/de";
      } else {
        if (targetLang) {
          targetUrl = (function() {
            switch (targetLang) {
              case "de":
                setLocalStorage("lang", targetLang);
                return window.location.pathname.replace("en/", "de/");
              case "en":
                setLocalStorage("lang", targetLang);
                return window.location.pathname.replace("de/", "en/");
              default:
                return window.location.pathname;
            }
          })();
        } else {
          targetUrl = (function() {
            switch (false) {
              case window.location.pathname.indexOf("de/") !== 1:
                setLocalStorage("lang", "en");
                return window.location.pathname.replace("de/", "en/");
              case window.location.pathname.indexOf("en/") !== 1:
                setLocalStorage("lang", "de");
                return window.location.pathname.replace("en/", "de/");
              default:
                return window.location.pathname;
            }
          })();
        }
      }
      if (window.location.pathname !== targetUrl) {
        return window.location.href = targetUrl;
      }
    };
    if (hasLocalStorage()) {
      currentLang = getLocalStorage("lang");
      if (currentLang) {
        changeLangInUrl(currentLang);
      }
    }
    $(".switchLanguage, .switchLanguageResponsive").on("click", "a[data-action=switch-language]", function(evt) {
      evt.stopPropagation();
      return changeLangInUrl();
    });
  }
  sliders = $("*[data-effect=overlay-slide]");
  if (Modernizr.touch) {
    sliders.addClass("fluid");
  } else {
    if (sliders.length > 0) {
      new Scroll({
        el: sliders
      });
    }
  }
  scrollToTarget = function(target, offset) {
    var subnavHeight, targetOffset;
    if (offset == null) {
      offset = 10;
    }
    if (tag === "dev") {
      offset = -195;
    }
    if (target && target.length > 0) {
      targetOffset = target.offset().top;
      subnavHeight = $(".subnav-bottom").outerHeight() - offset;
      return $("html,body").animate({
        scrollTop: targetOffset - subnavHeight
      }, {
        duration: 500,
        done: function() {
          return _.delay(function() {
            $(".topnav").removeClass("visible");
            return $(".subnav-bottom").removeClass("increased");
          }, 100);
        }
      });
    }
  };
  if (location.hash) {
    hash = location.hash.replace(/\/$/, "");
    targetName = hash.substring(1);
    targetElement = $("*[name=" + targetName + "]");
    if (targetElement.length === 0) {
      targetElement = $("#" + targetName);
    }
    scrollToTarget(targetElement);
  }
  $(window).on("hashchange", function(evt) {
    return evt.stopPropagation();
  });
  if (tag === "dev") {
    $(document).on("click", "*[data-view=wiki-page] a", function(evt) {
      var href, target;
      target = $(evt.currentTarget);
      href = target.attr("href");
      if (href.indexOf("#") === 0) {
        evt.stopPropagation();
        targetName = href.substring(1);
        return scrollToTarget($("*[name=" + targetName + "]"));
      }
    });
  }
  $(document).on("click", "*[data-navigate=true]", function(evt) {
    var targetId;
    evt.stopPropagation();
    targetName = $(this).attr("name");
    targetId = $(this).attr("href");
    if (!targetName) {
      targetName = targetId.substring(1);
    }
    scrollToTarget($("*[name=" + targetName + "]"));
    if (history.pushState) {
      history.pushState(null, null, targetId);
    } else {
      location.hash = targetId;
    }
    return false;
  });
  if (tag === "start") {
    $(".carousel").carousel();
  }
  _.each($("*[data-toggle=fading-cycle-carousel]"), initFadingCycleCarousel);
  $("img.lazy").show().lazyload({
    effect: "fadeIn",
    skip_invisible: false,
    event: "invisible"
  });
  $("img.lazy").trigger("invisible");
  timeout = void 0;
  tooltipClicked = false;
  initTooltip = function() {};
  destroyTooltip = function(target) {
    target.tooltip("destroy");
    target.removeClass("active");
    tooltipClicked = false;
    bindTooltip();
    return $(document).off("click.tooltip");
  };
  bindTooltip = function() {
    return initTooltip = _.once(function(target) {
      var t;
      target.addClass("active");
      target.tooltip({
        trigger: "manual",
        html: true,
        template: '<div class="tooltip"> <div class="tooltip-inner"></div> <div class="tooltip-footer"> <a data-action="tooltip-close"><i class="icon-cancel-circle-4"></i></a> </div> </div>'
      });
      target.tooltip("show");
      t = target.data("tooltip");
      t.$tip.on("click.tooltip", function(evt) {
        return evt.stopPropagation();
      });
      t.$tip.find("*[data-action=tooltip-close]").on("click.tooltip", function() {
        return destroyTooltip(target);
      });
      return $(document).on("click.tooltip", function(evt) {
        if ($(evt.target).closest("*[rel=tooltip]")[0] !== target[0]) {
          return destroyTooltip(target);
        }
      });
    });
  };
  bindTooltip();
  $("*[rel=tooltip]").on("click", function(evt) {
    var target;
    clearTimeout(timeout);
    target = $(evt.currentTarget);
    tooltipClicked = true;
    return initTooltip(target);
  });
  $("*[rel=tooltip]").hover(function(evt) {
    var target;
    target = $(evt.currentTarget);
    return timeout = setTimeout(function() {
      return initTooltip(target);
    }, 500);
  }, function(evt) {
    var target;
    clearTimeout(timeout);
    if (!tooltipClicked) {
      target = $(evt.currentTarget);
      return destroyTooltip(target);
    }
  });
  $("#tourGettingStartedTabs a").on("click", function(evt) {
    var el, tabs, target;
    evt.stopPropagation();
    el = $(evt.currentTarget);
    tabs = $("#tourGettingStartedTabs").children();
    _.each(tabs, function(tab, i) {
      return $(tab).removeClass("active done").find("a").text(i + 1);
    });
    el.closest("li").addClass("active");
    $.each(tabs, function(i, tab) {
      var icon;
      if ($(tab).hasClass("active")) {
        return false;
      } else {
        icon = $("<i>").addClass("icon-ok");
        return $(tab).addClass("done").find("a").html(icon);
      }
    });
    $("#tourGettingStartedTabsContent .tab-pane").removeClass("in active");
    target = el.data("target");
    return $("" + target).addClass("in active");
  });
  fadingInterval = void 0;
  $("#startReasonTab a[href=#reason2]").on("click", function(evt) {
    var fadeCycle, fadingImages;
    fadingImages = $(".img-fading-cycle").removeClass("in");
    if (fadingImages.length > 0) {
      clearInterval(fadingInterval);
      fadingImages.first().addClass("in");
      fadeCycle = function() {
        var active, activeIndex, nextIndex;
        active = fadingImages.parent().find(".in");
        activeIndex = fadingImages.index(active);
        active.removeClass("in");
        nextIndex = (activeIndex + 1) > (fadingImages.length - 1) ? 0 : activeIndex + 1;
        return $(fadingImages.get(nextIndex)).addClass("in");
      };
      return fadingInterval = setInterval(fadeCycle, 3000);
    }
  });
  $("#planHelpCollapsable .collapse").on("show hide", function(evt) {
    return toggleCollapseIcons($(evt.target).parent().find("i"));
  });
  $("#helpCollapsable .collapse").on("show hide", function(evt) {
    return toggleCollapseIcons($(evt.target).parent().find("i"));
  });
  $("#jobsAccordion .collapse").on("show hide", function(evt) {
    return toggleCollapseIcons($(evt.target).closest(".accordion-group").find(".job-title i"));
  });
  $("#jobsAccordion .collapse").on("shown", function(evt) {
    return scrollToTarget($(evt.target).closest(".accordion-group"), -70);
  });
  $("#jobsAccordion .collapse").on("hidden", function(evt) {
    return $(evt.target).closest(".accordion-group").find("*[data-toggle=collapse]").addClass("collapsed");
  });
  if (tag === "customers") {
    changePage = function(pageId) {
      $("#customer-pages .cp-container").hide();
      $(pageId).fadeIn();
      $("#customer-pages *[data-action=change-page] li").removeClass("active");
      return $("a[href=" + pageId + "]").parent().addClass("active");
    };
    $("*[data-action=change-page]").on('click', function(evt) {
      var target;
      evt.stopPropagation();
      target = $(evt.target);
      changePage(target.attr('href'));
      return false;
    });
  }
  if (tag === "carts-and-orders" || tag === "api-and-developers") {
    prettifyCode();
  }
  if (tag === "blog" || tag === "news") {
    $blogDetailView = $("section[data-created-at][data-category-id]");
    nameLang = currentLang;
    if (tag === "blog") {
      nameLang = "en";
    }
    if ($blogDetailView.length > 0) {
      createdAt = $blogDetailView.data("created-at");
      categoryId = $blogDetailView.data("category-id");
      $.getJSON("/scripts/api/prev-next.php?createdAt=" + createdAt + "&categoryId=" + categoryId, function(data) {
        var $prevNextContainer, nextTemplate, noPostsTemplate, prevTemplate;
        $prevNextContainer = $blogDetailView.find("*[data-view=blog-prev-next]");
        $prevNextContainer.empty();
        if (data.previous) {
          prevTemplate = "<div class=\"previous-post " + (!data.next ? 'single-post' : void 0) + "\">\n  <a href=\"/" + (currentLang !== 'en' ? currentLang + '/' : '') + tag + "/" + data.previous.slug['en'] + ".html\">\n    <p>Previous post</p>\n    <hr>\n    <p>" + data.previous.name[nameLang] + "</p>\n  </a>\n</div>";
          $prevNextContainer.append(prevTemplate);
        }
        if (data.next) {
          nextTemplate = "<div class=\"next-post " + (!data.previous ? 'single-post' : void 0) + "\">\n  <a href=\"/" + (currentLang !== 'en' ? currentLang + '/' : '') + tag + "/" + data.next.slug['en'] + ".html\">\n    <p>Next post</p>\n    <hr>\n    <p>" + data.next.name[nameLang] + "</p>\n  </a>\n</div>";
          $prevNextContainer.append(nextTemplate);
        }
        if (!data.previous && !data.next) {
          noPostsTemplate = "<div class=\"no-posts single-post\">\n  <a>\n    <p>No more posts</p>\n    <hr>\n    <p></p>\n  </a>\n</div>";
          return $prevNextContainer.append(noPostsTemplate);
        }
      });
    }
  }
  if (tag === "dev") {
    $("a[data-role=submenu]").on("click", function(evt) {
      var target, targetMenu;
      evt.stopPropagation();
      target = $(evt.target).closest("a");
      targetMenu = target.data("target");
      $(".level2").each(function() {
        var el;
        el = $(this);
        if (el.attr("id") !== targetMenu) {
          el.closest("li").find("i").first().removeClass("icon-minus-circle-3").addClass("icon-plus-circle-3");
          return el.hide();
        }
      });
      targetElement = $("#" + targetMenu);
      if (targetElement.is(":visible")) {
        targetElement.fadeOut(500);
      } else {
        targetElement.fadeIn(500);
      }
      return toggleCollapseIcons(target.find("i"));
    });
    $(document).ready(function() {
      var getSearchUrl, onAutocompleteSearchComplete, query_params, renderAutocompleteSearchResult, renderLoadingSearch, renderSearchResult, stripPageTitle;
      stripPageTitle = function(title) {
        var splitted;
        splitted = title.split('commercetools - ');
        if (splitted.length > 1) {
          return splitted[1];
        } else {
          return title;
        }
      };
      getSearchUrl = function(resultUrl) {
        var SWIFTYPE_SEARCH_DOMAIN, currentDomain, searchHref, splittedUrl;
        SWIFTYPE_SEARCH_DOMAIN = 'http://dev.sphere.io/';
        splittedUrl = resultUrl.split(SWIFTYPE_SEARCH_DOMAIN);
        if (splittedUrl.length > 1) {
          searchHref = splittedUrl[1];
          currentDomain = location.protocol + "//" + location.host + "/";
          if (currentDomain === SWIFTYPE_SEARCH_DOMAIN) {
            return resultUrl;
          } else {
            return currentDomain + "dev/" + searchHref;
          }
        } else {
          return resultUrl;
        }
      };
      renderAutocompleteSearchResult = function(document_type, item) {
        var body;
        body = item.highlight['sections'] || '';
        return "<p class=\"title\">" + (stripPageTitle(item['title'])) + "</p>\n<p class=\"description\">" + body + "</p>";
      };
      renderSearchResult = function(document_type, result) {
        var body, url;
        body = result.highlight['body'] || result.highlight['sections'] || result['body'].substring(0, 300);
        url = getSearchUrl(result['url']);
        return "<div class=\"search-result\">\n  <h2>\n    <a href=\"" + url + "\" target=\"_blank\">\n      <span class=\"external-link\">&#8599;</span> " + (stripPageTitle(result['title'])) + "\n    </a>\n  </h2>\n  <small>" + url + "</small>\n  <p class=\"description\">" + body + "</p>\n</div>";
      };
      renderLoadingSearch = function(query, $resultContainer) {
        return $resultContainer.html('<p>Loading search results...</p>');
      };
      onAutocompleteSearchComplete = function(item, prefix) {
        return location.href = getSearchUrl(item['url']);
      };
      query_params = $.queryParams();
      $('#st-search-input').val(query_params.stq);
      $('*[data-view=search-terms] span').text(query_params.stq);
      $('form[name=apiSearch]').submit(function(evt) {
        var params, path, query;
        query = $(this).find('input').val().trim();
        if (query) {
          params = [];
          params.push('stp=1');
          params.push("stq=" + (encodeURIComponent(query)));
          path = "/dev/search.html?" + (params.join('&'));
          location.href = path;
        }
        event.preventDefault();
        return false;
      });
      $('#st-search-input').swiftype({
        engineKey: SWIFTYPE_PUBLIC_KEY,
        renderFunction: renderAutocompleteSearchResult,
        onComplete: onAutocompleteSearchComplete
      });
      $('#st-search-input').swiftypeSearch({
        engineKey: SWIFTYPE_PUBLIC_KEY,
        resultContainingElement: '#search-results',
        renderFunction: renderSearchResult,
        loadingFunction: renderLoadingSearch
      });
      return $('#st-search-input').focus();
    });
  }
  $(".collapse").on("shown hidden", function() {
    return $('[data-spy="scroll"]').each(function() {
      var $spy;
      $spy = $(this).scrollspy('refresh');
      return $(window).trigger("packman");
    });
  });
  pixelCounter = $("#pixelCounter");
  sidebar = $(".sidebar-menu");
  footer = $("footer");
  mainContent = $("[data-view=main-content]");
  $document = $(document);
  $window = $(window);
  $(window).on("scroll packman", function() {
    var data, options, scrolled, total;
    scrolled = $window.scrollTop();
    total = $document.height();
    data = [[0, 1], [scrolled, 1]];
    options = {
      series: {
        lines: {
          show: true,
          lineWidth: 3
        },
        color: '#00ba9f'
      },
      legend: {
        show: true
      },
      grid: {
        show: false,
        borderColor: "transparent"
      },
      xaxis: {
        tickLength: 0,
        tickColor: "transparent",
        labelWidth: null,
        labelHeight: null,
        min: 0,
        max: total - $window.height()
      },
      yaxis: {
        tickLength: 0,
        tickColor: "transparent",
        labelWidth: null,
        labelHeight: null,
        min: 1,
        max: 1
      }
    };
    return $.plot($("#pixelCounter"), [data], options);
  });
  $("*[data-action=show-contactform]").on("click", function(evt) {
    var defaultSubject, target;
    target = $(evt.target);
    defaultSubject = target.data("contact-subject") || "Product";
    $("select[name=00ND0000005kSyu] option[value=" + defaultSubject + "]").attr("selected", true);
    return $("#helpContactModal").modal("toggle");
  });
  $("#helpContactModal").on("show", function(evt) {
    var code, form;
    code = generateCaptcha();
    form = $("#helpContactModal");
    form.find("input[name=cvk]").val(code);
    return form.find("span#cvk").text(code);
  });
  $("#helpContactForm").on("click", "a[data-action=submit-contact-form]", function(evt) {
    var SALEFORCE_URL, form, invalid, required, submit;
    form = $(evt.target).closest("form");
    required = form.find(':input').filter('[required]');
    required.attr("aria-invalid", "false");
    invalid = required.filter(function() {
      return !$(this).val();
    });
    if (invalid.length > 0) {
      invalid.attr("aria-invalid", "true");
      $(this).find(".contact-message-error").show();
      return false;
    }
    if (verifyCaptcha(form)) {
      submit = form.find("[type=submit]");
      submit.button('loading');
      form.find("input[name=retURL]").val(function() {
        var origin, query;
        query = window.location.search;
        if (query.charAt(0) === "?") {
          query += "&";
        } else {
          query += "?";
        }
        if (window.location.origin) {
          origin = window.location.origin;
        } else {
          origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        return origin + window.location.pathname + query + "sent=ok" + window.location.hash;
      });
      dataLayer.push({
        convType: 'lead'
      });
      SALEFORCE_URL = "https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";
      form.attr("action", SALEFORCE_URL);
      form.submit();
      return false;
    } else {
      form.find("input[name=cvkInput]").attr("aria-invalid", "true");
      $(this).find(".contact-message-error").show();
      return false;
    }
  });
  if (/[?&]sent=ok/.test(location.href)) {
    modal = $("#helpContactModal");
    message = modal.find(".contact-message-success");
    modal.removeClass("hide").addClass("in");
    setTimeout(((function(_this) {
      return function() {
        return message.fadeIn("slow");
      };
    })(this)), 500);
    setTimeout(((function(_this) {
      return function() {
        modal.removeClass("in").modal("hide");
        return message.fadeOut("slow");
      };
    })(this)), 3500);
  }
  if (tag === "about") {
    $(window).scroll(function() {
      $(".company-timeline .year-container .yearContain").each(function() {
        var entryDestinationY, entryOriginY, offset, scrollPositionY;
        $(this).removeClass("active");
        entryOriginY = $(this).offset().top;
        entryDestinationY = entryOriginY + $(this).outerHeight(true);
        scrollPositionY = $(document).scrollTop();
        offset = $("header.container").outerHeight();
        offset += 260;
        scrollPositionY += offset;
        if (scrollPositionY > entryOriginY && scrollPositionY < entryDestinationY) {
          return $(this).addClass("active");
        }
      });
    });
  }
  if (tag === "carts-and-orders") {
    $(".order-api-method, .order-api-language").on('change', function() {
      var language, method;
      $(".order-api-entry").removeClass("active");
      method = $(".order-api-method").val();
      language = $(".order-api-language").val();
      return $(".order-api-entry" + "." + method + "." + language).addClass("active");
    });
    return;
  }
  if (tag === "pricing") {
    slider = $("input[name=revenue]");
    currentPlan = "established";
    initializePricingSlider = function() {
      return slider.slider({
        value: 0,
        template: getRangeSliderTemplate(),
        formater: function(value) {
          var revenue;
          revenue = getRevenueValue(value);
          updateEstimatedOverview(currentPlan, value, revenue);
          return revenue + " €";
        }
      });
    };
    changePricingPlan = function(plan) {
      var revenue, sliderValue;
      currentPlan = plan;
      sliderValue = slider.val();
      revenue = getRevenueValue(sliderValue);
      updateEstimatedOverview(currentPlan, sliderValue, revenue);
      $("*[data-toggle=plan]").removeClass("active");
      return $("*[data-plan=" + plan + "]").addClass("active");
    };
    $("*[data-view=estimation-view]").on("click", "*[data-toggle=plan]", function(evt) {
      var estimationContainer, plan, target;
      target = $(evt.currentTarget);
      plan = target.data("plan");
      estimationContainer = target.closest("*[data-view=estimation-view]");
      estimationContainer.attr("data-step", "2").attr("data-plan", plan);
      changePricingPlan(plan);
      scrollToTarget($("*[data-view=estimation-overview]"), -100);
      return false;
    });
    initializePricingSlider();
    changePricingPlan("established");
    return $('.info-icon-star').tooltip();
  }
});

prettifyCode = function() {
  var isPretty;
  isPretty = false;
  $('pre').each(function() {
    var text;
    text = $(this).text();
    if (text.indexOf("\n") === 0) {
      text = text.substring(1);
    }
    text = text.replace(/&amp;gt;/, ">").replace(/&amp;lt;/, "<");
    return $(this).html(text);
  });
  $('pre.for-prettyprint').each(function() {
    if (!$(this).hasClass('prettyprint')) {
      $(this).addClass('prettyprint');
      return isPretty = true;
    }
  });
  if (isPretty) {
    return prettyPrint();
  }
};

generateCaptcha = function() {
  var code;
  code = "";
  _.each([0, 1, 2, 3, 4, 5], function() {
    return code += Math.ceil(Math.random() * 9);
  });
  return code;
};

verifyCaptcha = function(form) {
  var cvk, cvkInput;
  cvk = form.find("input[name=cvk]").val();
  cvkInput = form.find("input[name=cvkInput]").val();
  return !!(cvk && cvkInput && cvk === cvkInput);
};

toggleCollapseIcons = function(target) {
  if (target.hasClass("icon-plus-circle-3")) {
    return target.removeClass("icon-plus-circle-3").addClass("icon-minus-circle-3");
  } else {
    return target.removeClass("icon-minus-circle-3").addClass("icon-plus-circle-3");
  }
};

getRangeSliderTemplate = function() {
  return "<div class=\"slider\">\n  <div class=\"slider-track\">\n    <ul class=\"slider-pointers\">\n      <li class=\"point-big\"></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li class=\"point-big\"></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li class=\"point-big\"></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li></li>\n      <li class=\"point-big\"></li>\n    </ul>\n    <div class=\"slider-selection\"></div>\n    <div class=\"slider-handle\"></div>\n    <div class=\"slider-handle\"></div>\n  </div>\n  <div class=\"tooltip\">\n    <div class=\"tooltip-arrow\"></div>\n    <div class=\"tooltip-range\"></div>\n  </div>\n</div>";
};

updateEstimatedOverview = function(plan, value, revenue) {
  var estimatedCosts, overviewContainer;
  estimatedCosts = getEstimatedCosts(revenue, plan);
  overviewContainer = $("*[data-view=estimation-overview]");
  toggleEstimatedOverview(overviewContainer, value, estimatedCosts);
  return overviewContainer.show();
};

getRevenueValue = function(value) {
  switch (false) {
    case !((0 <= value && value < 10)):
      return value * 1000;
    case value !== 10:
      return 10000;
    case !((10 < value && value < 19)):
      return (value - 10 + 1) * 10000;
    case value !== 19:
      return 100000;
    case !((19 < value && value < 28)):
      return (value - 19 + 1) * 100000;
    case value !== 28:
      return 1000000;
    default:
      return "Over 1 Mio.";
  }
};

getEstimatedCosts = function(revenue, plan) {
  var costs, transactionCost;
  if (_.isNumber(revenue)) {
    switch (plan) {
      case "lean":
        transactionCost = revenue * 250 / 10000;
        costs = {
          plan: number_format(99, 2, ",", "."),
          transactions: number_format(transactionCost, 2, ",", "."),
          total: number_format(transactionCost + 99, 2, ",", ".")
        };
        return costs;
      case "aspiring":
        transactionCost = revenue * 225 / 10000;
        costs = {
          plan: number_format(249, 2, ",", "."),
          transactions: number_format(transactionCost, 2, ",", "."),
          total: number_format(transactionCost + 249, 2, ",", ".")
        };
        return costs;
      case "established":
        transactionCost = revenue * 200 / 10000;
        costs = {
          plan: number_format(499, 2, ",", "."),
          transactions: number_format(transactionCost, 2, ",", "."),
          total: number_format(transactionCost + 499, 2, ",", ".")
        };
        return costs;
      case "expanding":
        transactionCost = revenue * 150 / 10000;
        costs = {
          plan: number_format(999, 2, ",", "."),
          transactions: number_format(transactionCost, 2, ",", "."),
          total: number_format(transactionCost + 999, 2, ",", ".")
        };
        return costs;
      case "global":
        transactionCost = revenue * 125 / 10000;
        costs = {
          plan: number_format(1999, 2, ",", "."),
          transactions: number_format(transactionCost, 2, ",", "."),
          total: number_format(transactionCost + 1999, 2, ",", ".")
        };
        return costs;
    }
  }
};

toggleEstimatedOverview = function(overview, value, estimatedCosts) {
  overview.removeClass("over");
  if (value < 0) {
    return overview.removeClass("active");
  } else if (value > 28) {
    return overview.removeClass("active").addClass("over");
  } else {
    overview.addClass("active");
    overview.find("#estimatedCost").text(estimatedCosts.total + " €");
    overview.find("#estimatePackage").text(estimatedCosts.plan + " €");
    return overview.find("#estimateTransactions").text(estimatedCosts.transactions + " €");
  }
};

number_format = function(number, decimals, dec_point, thousands_sep) {
  var dec, n, prec, s, sep, toFixedFix;
  n = _.isFinite(number) ? number : 0;
  prec = _.isFinite(decimals) ? Math.abs(decimals) : 0;
  sep = _.isUndefined(thousands_sep) ? ',' : thousands_sep;
  dec = _.isUndefined(dec_point) ? '.' : dec_point;
  toFixedFix = function(n, prec) {
    var k;
    k = Math.pow(10, prec);
    return "" + Math.round(n * k) / k;
  };
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
};

startsWith = function(str, starts) {
  if (starts === '') {
    return true;
  }
  if (str === null || starts === null) {
    return false;
  }
  str = String(str);
  starts = String(starts);
  return str.length >= starts.length && str.slice(0, starts.length) === starts;
};

initFadingCycleCarousel = function(el) {
  var children, container, cycle, index, nonActiveItems;
  container = $(el);
  children = container.children();
  if (children.length > 3) {
    $(children.get(0)).addClass("active");
    $(children.get(1)).addClass("active");
    $(children.get(2)).addClass("active");
    nonActiveItems = filterNonActive(children);
    nonActiveItems.hide();
    index = 0;
    cycle = function() {
      var activeElementToChange, newElementToShow, updatedChildren;
      updatedChildren = container.children();
      nonActiveItems = filterNonActive(updatedChildren);
      activeElementToChange = $(updatedChildren.get(index));
      newElementToShow = $(nonActiveItems.get(0)).addClass("active");
      newElementToShow.insertAfter(activeElementToChange);
      activeElementToChange.fadeOut(200, "linear", function() {
        activeElementToChange.removeClass("active").appendTo(container);
        $("img.lazy").trigger("invisible");
        return newElementToShow.fadeIn(200);
      });
      if (index === 2) {
        return index = 0;
      } else {
        return index++;
      }
    };
    return setInterval(cycle, 3000);
  }
};

filterNonActive = function(el) {
  return el.filter(function() {
    return !$(this).hasClass("active");
  });
};

$(".solutions-items").on("mouseenter", "li", function() {
  var index, paras;
  index = $(this).index();
  paras = $(".solutions-text-p p");
  paras.addClass("hidden");
  return paras.eq(index).removeClass("hidden");
});

$(".solutions-items li").hover(function() {
  return $(this).addClass("solutions-items-active").siblings().removeClass("solutions-items-active");
});

$(".show-more").click(function() {
  event.preventDefault();
  $(this).closest('div').find(".extra-text").toggleClass("hidden");
  if ($(this).text() === "Less") {
    return $(this).text("More");
  } else {
    return $(this).text("Less");
  }
});

$(".dev-tiles").tooltip();
