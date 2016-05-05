/**
* @name: $.fn.animateCss
* @author: Tobias Järvelöv <tobias@jarvelov.se>
* @created: 2016-05-05
* @version: 1.01
* @url: https://tobias.jarvelov.se/portfolio/animatecss.jquery.js
* @dependencies:
  jQuery > 1.8
  animate.css: github.com/daneden/animate.css/
* @description:
    jQuery plugin to animate any element using animate.css (by daneden) classes.
    Chain multiple animations and add extra css properties for the duration
* @changelog:
  v1.01: Convert to bower package
  v1.0: Initial release
**/
(function($) {
  $.fn.animateCss = function(options) {
    var settings = $.extend({
      animations: [], //animate.css animations to apply e.g. ['fadeOut', 'fadeIn']
      css: false, //Object with css properties e.g. { color: '#000', fontSize: '14px' }
      cssDelay: 0, //Delay removal of css properties with given delay e.g. 1000 = 1 sec
    }, options);

    var module = {
      addAnimation: function(element, className) {
        var def = $.Deferred(function(def) {
          var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

          //Add animation classes
          $(element).addClass('animated ' + className).one(animationEnd, function(e) {
            var classNames = e.currentTarget.className.split(' ')

            if($.inArray(className, classNames)) {
              def.resolve(className);
            } else {
              def.reject(className);
            }
          });
        });

        return def.promise();
      },
      removeAnimation: function(element, className) {
        var def = $.Deferred(function(def) {
          $(element).removeClass('animated ' + className);
          def.resolve();
        });

        return def.promise();
      },
      init: function(element) {
        var def = $.Deferred();

        //When the deferred object is resolved, apply css, if any
        def.then(function() {
          if(settings.css) {
            $(element).css(settings.css);
          }
        });

        //Programmatically build the sequence of animations
        var promises = [def.promise()]; //Use the main deferred object as the first one in the chain
        $.each(settings.animations, function(i, className) {
          var animation = $.Deferred();

          //When the first promise is resolved, move on the the second, then the third etc.
          promises[i].done(function() {
            //Apply the animation class to the element
            module.addAnimation(element, className)
            //When the animation has finished remove the applied class
            .done(function() {
              module.removeAnimation(element, className)
              //Finally resolve the deferred object
              .done(function() {
                animation.resolve();
              });
            });
          })

          //Push this promise to the array for the next animation to hook on to
          promises.push(animation.promise());
        });

        //When last promise is either resolved or rejected clean up element
        promises[promises.length -1].always(function() {
          //Remove applied css, if any
          if(settings.css) {
            setTimeout(function() {
              $.each(settings.css, function(property) {
                $(element).css(property, '');
              });
            }, settings.cssDelay);
          }

        })

        //Invoke the chain
        def.resolve();
      }
    }

    if($(this).length > 0) {
      return module.init($(this), options);
    }

    return module;
  }
}(jQuery))
