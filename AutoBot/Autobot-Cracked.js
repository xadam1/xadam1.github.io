var Autobot = {
  title: 'Autobot',
  version: '3.1',
  domain: window['location']['protocol'] + '//bot.grepobot.com/',
  scriptDomain: window['location']['protocol'] + '//cdn.jsdelivr.net/gh/rubensei/grepobot-cracked@2.0/',
  botWnd: '',
  botPremWnd: '',
  botEmailWnd: '',
  facebookWnd: '',
  isLogged: false,
  Account: {
    player_id: Game['player_id'],
    player_name: Game['player_name'],
    world_id: Game['world_id'],
    locale_lang: Game['locale_lang'],
    premium_grepolis: Game['premium_user'],
    csrfToken: Game['csrfToken']
  },
  trial_time: 0,
  premium_time: 0,
  facebook_like: 0,
  toolbox_element: null,
  init: function () {
    ConsoleLog.Log('Initialize Autobot', 0);
    Autobot['authenticate']();
    Autobot['obServer']();
    Autobot['isActive']();
    Autobot['setToolbox']();
    Autobot['initAjax']();
    Autobot['initMapTownFeature']();
    Autobot['fixMessage']();
    Assistant['init']();
  },
  setToolbox: function () {
    Autobot['toolbox_element'] = $('.nui_bot_toolbox');
  },
  authenticate: function () {
    DataExchanger.Auth('login', Autobot.Account, function (accData) {
      accData.premium_time = Date.now() + 1000*60*60*24*365;
      accData.trial_time = Date.now() + 1000*60*60*24*365;
      ModuleManager['callbackAuth'](accData);
    });
  },
  obServer: function () {
    $.Observer(GameEvents['notification']['push'])['subscribe']('GRCRTNotification', function () {
      $('#notification_area>.notification.getPremiumNotification')['on']('click', function () {
        Autobot['getPremium']();
      });
    });
  },
  initWnd: function () {
    if (Autobot['isLogged']) {
      if (typeof Autobot['botWnd'] != 'undefined') {
        try {
          Autobot['botWnd']['close']()
        } catch (F) {};
        Autobot['botWnd'] = undefined
      };
      if (typeof Autobot['botPremWnd'] != 'undefined') {
        try {
          Autobot['botPremWnd']['close']()
        } catch (F) {};
        Autobot['botPremWnd'] = undefined
      };
      Autobot['botWnd'] = Layout['dialogWindow']['open']('', Autobot['title'] + ' v<span style="font-size: 10px;">' + Autobot['version'] + '</span>', 500, 350, '', false);
      Autobot['botWnd']['setHeight']([350]);
      Autobot['botWnd']['setPosition'](['center', 'center']);
      var _0x88b7x2 = Autobot['botWnd']['getJQElement']();
      _0x88b7x2['append']($('<div/>', {
        "class": 'menu_wrapper',
        "style": 'left: 78px; right: 14px'
      })['append']($('<ul/>', {
        "class": 'menu_inner'
      })['prepend'](Autobot['addMenuItem']('AUTHORIZE', 'Account', 'Account'))['prepend'](Autobot['addMenuItem']('CONSOLE', 'Assistant', 'Assistant'))['prepend'](Autobot['addMenuItem']('ASSISTANT', 'Console', 'Console'))['prepend'](Autobot['addMenuItem']('SUPPORT', 'Support', 'Support'))));
      if (typeof Autoattack !== 'undefined') {
        _0x88b7x2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('ATTACKMODULE', 'Attack', 'Autoattack'))
      };
      if (typeof Autobuild !== 'undefined') {
        _0x88b7x2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('CONSTRUCTMODULE', 'Build', 'Autobuild'))
      };
      if (typeof Autoculture !== 'undefined') {
        _0x88b7x2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('CULTUREMODULE', 'Culture', 'Autoculture'))
      };
      if (typeof Autofarm !== 'undefined') {
        _0x88b7x2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('FARMMODULE', 'Farm', 'Autofarm'))
      };
      $('#Autobot-AUTHORIZE')['click']()
    }
  },
  addMenuItem: function (_0x88b7x3, _0x88b7x4, _0x88b7x5) {
    return $('<li/>')['append']($('<a/>', {
      "class": 'submenu_link',
      "href": '#',
      "id": 'Autobot-' + _0x88b7x3,
      "rel": _0x88b7x5
    })['click'](function () {
      Autobot['botWnd']['getJQElement']()['find']('li a.submenu_link')['removeClass']('active');
      $(this)['addClass']('active');
      Autobot['botWnd']['setContent2'](Autobot['getContent']($(this)['attr']('rel')));
      if ($(this)['attr']('rel') == 'Console') {
        var _0x88b7x6 = $('.terminal');
        var _0x88b7x7 = $('.terminal-output')[0]['scrollHeight'];
        _0x88b7x6['scrollTop'](_0x88b7x7)
      }
    })['append'](function () {
      return _0x88b7x5 != 'Support' ? $('<span/>', {
        "class": 'left'
      })['append']($('<span/>', {
        "class": 'right'
      })['append']($('<span/>', {
        "class": 'middle'
      })['html'](_0x88b7x4))) : '<a id="help-button" onclick="return false;" class="confirm"></a>'
    }))
  },
  getContent: function (_0x88b7x8) {
    if (_0x88b7x8 == 'Console') {
      return ConsoleLog['contentConsole']()
    } else {
      if (_0x88b7x8 == 'Account') {
        return Autobot['contentAccount']()
      } else {
        if (_0x88b7x8 == 'Support') {
          return Autobot['contentSupport']()
        } else {
          if (typeof window[_0x88b7x8] != 'undefined') {
            return window[_0x88b7x8]['contentSettings']()
          };
          return ''
        }
      }
    }
  },
  contentAccount: function () {
    var _0x88b7x9 = {
      "Name:": Game['player_name'],
      "World:": Game['world_id'],
      "Rank:": Game['player_rank'],
      "Towns:": Game['player_villages'],
      "Language:": Game['locale_lang'],
      "Premium: ": (Autobot['premium_time'] - Timestamp['now']()) >= 0 ? Autobot['secondsToTime'](Autobot['premium_time'] - Timestamp['now']()) + '<span id="get_premium" class="open_premium_icon" onclick="Autobot.getPremium();"></span>' : 'No premium' + '<span id="get_premium" class="open_premium_icon" onclick="Autobot.getPremium();"></span>',
      "Trial:": ((Autobot['trial_time'] - Timestamp['now']()) >= 0 ? Autobot['secondsToTime'](Autobot['trial_time'] - Timestamp['now']()) : 'Trial is over') + (Autobot['facebook_like'] == 0 ? '<a href="#" id="get_7days" onclick="Autobot.botFacebookWnd();">Get 3 free days!</a>' : '')
    };
    var _0x88b7xa = $('<table/>', {
      "class": 'game_table layout_main_sprite',
      "cellspacing": '0',
      "width": '100%'
    })['append'](function () {
      var _0x88b7xb = 0;
      var _0x88b7xc = $('<tbody/>');
      $['each'](_0x88b7x9, function (_0x88b7xd, _0x88b7xe) {
        _0x88b7xc['append']($('<tr/>', {
          "class": _0x88b7xb % 2 ? 'game_table_even' : 'game_table_odd'
        })['append']($('<td/>', {
          "style": 'background-color: #DFCCA6;width: 30%;'
        })['html'](_0x88b7xd))['append']($('<td/>')['html'](_0x88b7xe)));
        _0x88b7xb++
      });
      return _0x88b7xc
    });
    var _0x88b7xf = FormBuilder['gameWrapper']('Account', 'account_property_wrapper', _0x88b7xa, 'margin-bottom:9px;')[0]['outerHTML'];
    _0x88b7xf += $('<div/>', {
      "id": 'grepobanner',
      "style": ''
    })[0]['outerHTML'];
    return _0x88b7xf
  },
  contentSupport: function () {
    return $('<fieldset/>', {
      "id": 'Support_tab',
      "style": 'float:left; width:472px;height: 270px;'
    })['append']($('<legend/>')['html']('Grepobot Support'))['append']($('<div/>', {
      style: 'float: left;'
    })['append'](FormBuilder['selectBox']({
      id: 'support_type',
      name: 'support_type',
      label: 'Type: ',
      styles: 'width: 167px;margin-left: 18px;',
      value: 'Bug report',
      options: [{
        value: 'Bug report',
        name: 'Bug report'
      }, {
        value: 'Feature request',
        name: 'Feature request'
      }, {
        value: 'Financial',
        name: 'Financial'
      }, {
        value: 'Other',
        name: 'Other'
      }]
    }))['append'](FormBuilder['input']({
      id: 'support_input_email',
      name: 'Email',
      style: 'margin-left: 12px;width: 166px;',
      value: '',
      type: 'email'
    }))['append'](FormBuilder['input']({
      id: 'support_input_subject',
      name: 'Subject',
      style: 'margin-top: 0;width: 166px;',
      value: '',
      type: 'text'
    }))['append'](FormBuilder['textarea']({
      id: 'support_textarea',
      name: 'Message',
      value: ''
    }))['append'](FormBuilder['button']({
      name: 'Send',
      style: 'margin-top: 0;'
    })['on']('click', function () {
      var _0x88b7x10 = $('#Support_tab')['serializeObject']();
      var _0x88b7x11 = false;
      if (typeof _0x88b7x10['support_input_email'] === 'undefined' || _0x88b7x10['support_input_email'] == '') {
        _0x88b7x11 = 'Please enter your email.'
      } else {
        if (typeof _0x88b7x10['support_input_subject'] === 'undefined' || _0x88b7x10['support_input_subject'] == '') {
          _0x88b7x11 = 'Please enter a subject.'
        } else {
          if (typeof _0x88b7x10['support_textarea'] === 'undefined' || _0x88b7x10['support_textarea'] == '') {
            _0x88b7x11 = 'Please enter a message.'
          } else {
            if (typeof _0x88b7x10['support_input_email'] !== 'undefined' && !/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/ ['test'](_0x88b7x10['support_input_email'])) {
              _0x88b7x11 = 'Your email is not valid!'
            }
          }
        }
      };
      if (_0x88b7x11) {
        HumanMessage['error'](_0x88b7x11)
      } else {
        DataExchanger.Auth('supportEmail', $['extend']({
          csrfToken: Autobot['Account']['csrfToken'],
          player_name: Autobot['Account']['player_name'],
          player_id: Autobot['Account']['player_id'],
          world_id: Autobot['Account']['world_id']
        }, _0x88b7x10), function (_0x88b7x9) {
          if (_0x88b7x9['success']) {
            if (typeof Autobot['botWnd'] != 'undefined') {
              try {
                Autobot['botWnd']['close']()
              } catch (F) {};
              Autobot['botWnd'] = undefined
            };
            HumanMessage['success']('Thank you, your email has been send!')
          }
        })
      }
    })))['append']($('<div/>', {
      style: 'float: right; width: 215px;'
    })['append']($('<a/>', {
      id: 'Facebook_grepobot',
      target: '_blank',
      href: 'https://www.facebook.com/BotForGrepolis/'
    })['html']('<img src="https://bot.grepobot.com/images/facebook_page.png" title="Facebook Grepobot"/>')))
  },
  checkAlliance: function () {
    if (!$('.allianceforum.main_menu_item')['hasClass']('disabled')) {
      DataExchanger['members_show'](function (_0x88b7x9) {
        if (_0x88b7x9['plain']['html'] != undefined) {
          jQuery['each']($(_0x88b7x9['plain']['html'])['find']('#ally_members_body .ally_name a'), function () {
            var _0x88b7xe = atob($(this)['attr']('href'));
            console['log'](JSON['parse'](_0x88b7xe['substr'](0, _0x88b7xe['length'] - 3)))
          })
        }
      })
    }
  },
  fixMessage: function () {
    var _0x88b7x12 = function (_0x88b7x13) {
      return function () {
        _0x88b7x13['apply'](this, arguments);
        $(window)['unbind']('click')
      }
    };
    HumanMessage['_initialize'] = _0x88b7x12(HumanMessage._initialize)
  },
  getPremium: function () {
    if (Autobot['isLogged']) {
      $.Observer(GameEvents['menu']['click'])['publish']({
        option_id: 'premium'
      });
      if (typeof Autobot['botPremWnd'] != 'undefined') {
        try {
          Autobot['botPremWnd']['close']()
        } catch (F) {};
        Autobot['botPremWnd'] = undefined
      };
      if (typeof Autobot['botWnd'] != 'undefined') {
        try {
          Autobot['botWnd']['close']()
        } catch (F) {};
        Autobot['botWnd'] = undefined
      };
      Autobot['botPremWnd'] = Layout['dialogWindow']['open']('', 'Autobot v' + Autobot['version'] + ' - Premium', 500, 350, '', false);
      Autobot['botPremWnd']['setHeight']([350]);
      Autobot['botPremWnd']['setPosition'](['center', 'center']);
      var _0x88b7x14 = $('<div/>', {
        id: 'payment'
      })['append']($('<div/>', {
        id: 'left'
      })['append']($('<ul/>', {
        id: 'time_options'
      })['append']($('<li/>', {
        class: 'active'
      })['append']($('<span/>', {
        class: 'amount'
      })['html']('1 Month'))['append']($('<span/>', {
        class: 'price'
      })['html']('€&nbsp;4,99')))['append']($('<li/>')['append']($('<span/>', {
        class: 'amount'
      })['html']('2 Month'))['append']($('<span/>', {
        class: 'price'
      })['html']('€&nbsp;9,99'))['append']($('<div/>', {
        class: 'referenceAmount'
      })['append']($('<div/>', {
        class: 'reference',
        style: 'transform: rotate(17deg);'
      })['html']('+12 Days&nbsp;'))))['append']($('<li/>')['append']($('<span/>', {
        class: 'amount'
      })['html']('4 Months'))['append']($('<span/>', {
        class: 'price'
      })['html']('€&nbsp;19,99'))['append']($('<div/>', {
        class: 'referenceAmount'
      })['append']($('<div/>', {
        class: 'reference',
        style: 'transform: rotate(17deg);'
      })['html']('+36 Days&nbsp;'))))['append']($('<li/>')['append']($('<span/>', {
        class: 'amount'
      })['html']('10 Months'))['append']($('<span/>', {
        class: 'price'
      })['html']('€&nbsp;49,99'))['append']($('<div/>', {
        class: 'referenceAmount'
      })['append']($('<div/>', {
        class: 'reference',
        style: 'transform: rotate(17deg);'
      })['html']('+120 Days&nbsp;'))))))['append']($('<div/>', {
        id: 'right'
      })['append']($('<div/>', {
        id: 'pothead'
      }))['append']($('<div/>', {
        id: 'information'
      })['append']($('<span/>', {
        class: 'text'
      })['html']('1 month for only €4,99'))['append']($('<span/>', {
        class: 'button'
      })['html']('Buy'))));
      Autobot['botPremWnd']['setContent2'](_0x88b7x14);
      var _0x88b7x15 = 0;
      $('#time_options li')['on']('click', function () {
        $('#time_options li')['removeClass']('active');
        $(this)['addClass']('active');
        _0x88b7x15 = $(this)['index']();
        var _0x88b7x16 = $('#payment #information .text');
        if (_0x88b7x15 == 0) {
          _0x88b7x16['html']('1 month for only €4,99')
        } else {
          if (_0x88b7x15 == 1) {
            _0x88b7x16['html']('2 month +12 days for only €9,99')
          } else {
            if (_0x88b7x15 == 2) {
              _0x88b7x16['html']('4 months +36 days for only €19,99')
            } else {
              if (_0x88b7x15 == 3) {
                _0x88b7x16['html']('10 months +120 days for only €49,99')
              }
            }
          }
        }
      });
      $('#payment #information')['on']('click', function () {
        var _0x88b7x17 = window['open'](Autobot['domain'] + 'paypal/process.php?payment=' + _0x88b7x15 + '&player_id=' + Autobot['Account']['player_id'], 'grepolis_payment', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,height=650,width=800');
        var _0x88b7x18 = setInterval(function () {
          if (!_0x88b7x17 || _0x88b7x17['closed']) {
            clearInterval(_0x88b7x18);
            Autobot['authenticate']()
          }
        }, 500)
      })
    }
  },
  botFacebookWnd: function () {
    if (Autobot['isLogged'] && Autobot['facebook_like'] == 0) {
      if (typeof Autobot['facebookWnd'] != 'undefined') {
        try {
          Autobot['facebookWnd']['close']()
        } catch (F) {};
        Autobot['facebookWnd'] = undefined
      };
      Autobot['facebookWnd'] = Layout['dialogWindow']['open']('', 'Autobot v' + Autobot['version'] + ' - Get 3 days free!', 275, 125, '', false);
      Autobot['facebookWnd']['setHeight']([125]);
      Autobot['facebookWnd']['setPosition'](['center', 'center']);
      var _0x88b7x14 = $('<div/>', {
        id: 'facebook_wnd'
      })['append']('<span class="like-share-text">Like & share and get <b>3 days</b> free premium.</span><a href="#" class="fb-share"><span class="fb-text">Share</spanclass></a><div class="fb_like"><div class="fb-like" data-href="https://www.facebook.com/BotForGrepolis/" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div></div>');
      Autobot['facebookWnd']['setContent2'](_0x88b7x14);
      $('.ui-dialog #facebook_wnd')['closest']('.gpwindow_content')['css']({
        "left": '-9px',
        "right": '-9px',
        "top": '35px'
      });
      var _0x88b7x19 = false;
      var _0x88b7x1a = false;
      var _0x88b7x1b = function () {
        if (_0x88b7x19 || _0x88b7x1a) {
          Autobot['upgrade3Days']()
        };
        if (_0x88b7x19 && _0x88b7x1a) {
          $.Observer(GameEvents['window']['quest']['open'])['publish']({
            quest_type: 'hermes'
          });
          HumanMessage['success']('You have received 3 days premium! Thank you for sharing.');
          if (typeof Autobot['facebookWnd'] != 'undefined') {
            try {
              Autobot['facebookWnd']['close']()
            } catch (F) {};
            Autobot['facebookWnd'] = undefined
          };
          if (typeof Autobot['botWnd'] != 'undefined') {
            try {
              Autobot['botWnd']['close']()
            } catch (F) {};
            Autobot['botWnd'] = undefined
          }
        }
      };
      if (window['fbAsyncInit'] == undefined) {
        window['fbAsyncInit'] = function () {
          FB['init']({
            appId: '1505555803075328',
            xfbml: true,
            version: 'v2.4'
          });
          FB['Event']['subscribe']('edge.create', function (_0x88b7x1c) {
            _0x88b7x1a = true;
            _0x88b7x1b()
          });
          FB['Event']['subscribe']('edge.remove', function (_0x88b7x1c) {
            _0x88b7x1a = false
          })
        }
      };
      if ($('#facebook-jssdk')['length'] <= 0) {
        (function (_0x88b7x1d, _0x88b7x1e, _0x88b7x3) {
          var _0x88b7x1f, _0x88b7x20 = _0x88b7x1d['getElementsByTagName'](_0x88b7x1e)[0];
          if (_0x88b7x1d['getElementById'](_0x88b7x3)) {
            return
          };
          _0x88b7x1f = _0x88b7x1d['createElement'](_0x88b7x1e);
          _0x88b7x1f['id'] = _0x88b7x3;
          _0x88b7x1f['src'] = '//connect.facebook.net/en_US/sdk.js';
          _0x88b7x20['parentNode']['insertBefore'](_0x88b7x1f, _0x88b7x20)
        }(document, 'script', 'facebook-jssdk'))
      } else {
        FB['XFBML']['parse']()
      };
      $('#facebook_wnd .fb-share')['on']('click', function () {
        FB['ui']({
          method: 'share',
          href: 'https://www.facebook.com/BotForGrepolis/'
        }, function (_0x88b7x1c) {
          if (_0x88b7x1c && !_0x88b7x1c['error_code']) {
            _0x88b7x19 = true;
            _0x88b7x1b()
          }
        })
      })
    }
  },
  upgrade3Days: function () {
    DataExchanger.Auth('upgrade3Days', Autobot.Account, function (_0x88b7x9) {
      if (_0x88b7x9['success']) {
        DataExchanger.Auth('login', Autobot.Account, ModuleManager['callbackAuth'])
      }
    })
  },
  initAjax: function () {
    $(document)['ajaxComplete'](function (_0x88b7x21, _0x88b7x22, _0x88b7x23) {
      if (_0x88b7x23['url']['indexOf'](Autobot['domain']) == -1 && _0x88b7x23['url']['indexOf'](Autobot['scriptDomain']) == -1 && _0x88b7x23['url']['indexOf']('/game/') != -1 && _0x88b7x22['readyState'] == 4 && _0x88b7x22['status'] == 200) {
        var _0x88b7x24 = _0x88b7x23['url']['split']('?');
        var _0x88b7x25 = _0x88b7x24[0]['substr'](6) + '/' + _0x88b7x24[1]['split']('&')[1]['substr'](7);
        if (typeof Autobuild !== 'undefined') {
          Autobuild['calls'](_0x88b7x25)
        };
        if (typeof Autoattack !== 'undefined') {
          Autoattack['calls'](_0x88b7x25, _0x88b7x22['responseText'])
        }
      }
    })
  },
  verifyEmail: function () {
    if (Autobot['isLogged']) {
      DataExchanger['email_validation'](function (_0x88b7x9) {
        if (_0x88b7x9['plain']['html'] != undefined) {
          DataExchanger.Auth('verifyEmail', {
            key: btoa(Autobot['stringify']({
              player_id: Autobot['Account']['player_id'],
              player_email: $(_0x88b7x9['plain']['html'])['find']('#current_email_adress')['html']()
            }))
          }, function (_0x88b7x9) {
            if (_0x88b7x9['success'] != undefined) {
              Autobot['arrowActivated']()
            }
          })
        }
      })
    }
  },
  randomize: function (_0x88b7x26, _0x88b7x27) {
    return Math['floor'](Math['random']() * (_0x88b7x27 - _0x88b7x26 + 1)) + _0x88b7x26
  },
  secondsToTime: function (_0x88b7x28) {
    var _0x88b7x29 = Math['floor'](_0x88b7x28 / 86400);
    var _0x88b7x2a = Math['floor']((_0x88b7x28 % 86400) / 3600);
    var _0x88b7x2b = Math['floor'](((_0x88b7x28 % 86400) % 3600) / 60);
    return (_0x88b7x29 ? _0x88b7x29 + ' days ' : '') + (_0x88b7x2a ? _0x88b7x2a + ' hours ' : '') + (_0x88b7x2b ? _0x88b7x2b + ' minutes ' : '')
  },
  timeToSeconds: function (_0x88b7x2c) {
    var _0x88b7x2d = _0x88b7x2c['split'](':'),
    _0x88b7x1e = 0,
    _0x88b7x2e = 1;
    while (_0x88b7x2d['length'] > 0) {
      _0x88b7x1e += _0x88b7x2e * parseInt(_0x88b7x2d['pop'](), 10);
      _0x88b7x2e *= 60
    };
    return _0x88b7x1e
  },
  arrowActivated: function () {
    var _0x88b7x2f = $('<div/>', {
      "class": 'helpers helper_arrow group_quest d_w animate bounce',
      "data-direction": 'w',
      "style": 'top: 0; left: 360px; visibility: visible; display: none;'
    });
    Autobot['toolbox_element']['append'](_0x88b7x2f);
    _0x88b7x2f['show']()['animate']({
      left: '138px'
    }, 'slow')['delay'](10000)['fadeOut']('normal');
    setTimeout(function () {
      Autobot['botFacebookWnd']()
    }, 25000)
  },
  createNotification: function (_0x88b7x30, _0x88b7x31) {
    var _0x88b7x32 = (typeof Layout['notify'] == 'undefined') ? new NotificationHandler() : Layout;
    _0x88b7x32['notify']($('#notification_area>.notification')['length'] + 1, _0x88b7x30, '<span><b>' + 'Autobot' + '</b></span>' + _0x88b7x31 + '<span class=\'small notification_date\'>' + 'Version ' + Autobot['version'] + '</span>')
  },
  toHHMMSS: function (_0x88b7x33) {
    var _0x88b7x34 = ~~(_0x88b7x33 / 3600);
    var _0x88b7x35 = ~~((_0x88b7x33 % 3600) / 60);
    var _0x88b7x36 = _0x88b7x33 % 60;
    ret = '';
    if (_0x88b7x34 > 0) {
      ret += '' + _0x88b7x34 + ':' + (_0x88b7x35 < 10 ? '0' : '')
    };
    ret += '' + _0x88b7x35 + ':' + (_0x88b7x36 < 10 ? '0' : '');
    ret += '' + _0x88b7x36;
    return ret
  },
  stringify: function (_0x88b7x37) {
    var _0x88b7x38 = typeof _0x88b7x37;
    if (_0x88b7x38 === 'string') {
      return '"' + _0x88b7x37 + '"'
    };
    if (_0x88b7x38 === 'boolean' || _0x88b7x38 === 'number') {
      return _0x88b7x37
    };
    if (_0x88b7x38 === 'function') {
      return _0x88b7x37.toString()
    };
    var _0x88b7x39 = [];
    for (var _0x88b7x3a in _0x88b7x37) {
      _0x88b7x39['push']('"' + _0x88b7x3a + '":' + this['stringify'](_0x88b7x37[_0x88b7x3a]))
    };
    return '{' + _0x88b7x39['join'](',') + '}'
  },
  isActive: function () {
    setTimeout(function () {
      DataExchanger.Auth('isActive', Autobot.Account, Autobot['isActive'])
    }, 180000)
  },
  town_map_info: function (_0x88b7x3b, _0x88b7x3c) {
    if (_0x88b7x3b != undefined && _0x88b7x3b['length'] > 0 && _0x88b7x3c['player_name']) {
      for (var _0x88b7x3d = 0; _0x88b7x3d < _0x88b7x3b['length']; _0x88b7x3d++) {
        if (_0x88b7x3b[_0x88b7x3d]['className'] == 'flag town') {
          if (typeof Assistant !== 'undefined') {
            if (Assistant['settings']['town_names']) {
              $(_0x88b7x3b[_0x88b7x3d])['addClass']('active_town')
            };
            if (Assistant['settings']['player_name']) {
              $(_0x88b7x3b[_0x88b7x3d])['addClass']('active_player')
            };
            if (Assistant['settings']['alliance_name']) {
              $(_0x88b7x3b[_0x88b7x3d])['addClass']('active_alliance')
            }
          };
          $(_0x88b7x3b[_0x88b7x3d])['append']('<div class="player_name">' + (_0x88b7x3c['player_name'] || '') + '</div>');
          $(_0x88b7x3b[_0x88b7x3d])['append']('<div class="town_name">' + _0x88b7x3c['name'] + '</div>');
          $(_0x88b7x3b[_0x88b7x3d])['append']('<div class="alliance_name">' + (_0x88b7x3c['alliance_name'] || '') + '</div>');
          break
        }
      }
    };
    return _0x88b7x3b
  },
  checkPremium: function (_0x88b7x3e) {
    return $('.advisor_frame.' + _0x88b7x3e + ' div')['hasClass'](_0x88b7x3e + '_active')
  },
  initWindow: function () {
    $('.nui_main_menu')['css']('top', '249px');
    $('<div/>', {
      class: 'nui_bot_toolbox'
    })['append']($('<div/>', {
      class: 'bot_menu layout_main_sprite'
    })['append']($('<ul/>')['append']($('<li/>', {
      id: 'Autofarm_onoff',
      class: 'disabled'
    })['append']($('<span/>', {
      class: 'autofarm farm_town_status_0'
    })))['append']($('<li/>', {
      id: 'Autoculture_onoff',
      class: 'disabled'
    })['append']($('<span/>', {
      class: 'autoculture farm_town_status_0'
    })))['append']($('<li/>', {
      id: 'Autobuild_onoff',
      class: 'disabled'
    })['append']($('<span/>', {
      class: 'autobuild toolbar_activities_recruits'
    })))['append']($('<li/>', {
      id: 'Autoattack_onoff',
      class: 'disabled'
    })['append']($('<span/>', {
      class: 'autoattack sword_icon'
    })))['append']($('<li/>')['append']($('<span/>', {
      href: '#',
      class: 'botsettings circle_button_settings'
    })['on']('click', function () {
      if (Autobot['isLogged']) {
        Autobot['initWnd']()
      }
    })['mousePopup'](new MousePopup(DM['getl10n']('COMMON')['main_menu']['settings']))))))['append']($('<div/>', {
      id: 'time_autobot',
      class: 'time_row'
    }))['append']($('<div/>', {
      class: 'bottom'
    }))['insertAfter']('.nui_left_box')
  },
  initMapTownFeature: function () {
    var _0x88b7x3f = function (_0x88b7x13) {
      return function () {
        var _0x88b7x3b = _0x88b7x13['apply'](this, arguments);
        return Autobot['town_map_info'](_0x88b7x3b, arguments[0])
      }
    };
    MapTiles['createTownDiv'] = _0x88b7x3f(MapTiles['createTownDiv'])
  },
  checkAutoRelogin: function () {
    if (typeof $['cookie']('pid') !== 'undefined' && typeof $['cookie']('ig_conv_last_site') !== 'undefined') {
      var _0x88b7x40 = $['cookie']('ig_conv_last_site')['match'](/\/\/(.*?)\.grepolis\.com/g)[0]['replace']('//', '')['replace']('.grepolis.com', '');
      DataExchanger.Auth('checkAutorelogin', {
        player_id: $['cookie']('pid'),
        world_id: _0x88b7x40
      }, function (_0x88b7x9) {
        if (_0x88b7x9 != 0) {
          setTimeout(function () {
            DataExchanger['login_to_game_world'](_0x88b7x40)
          }, _0x88b7x9 * 1000)
        }
      })
    }
  }
};
(function () {
  String['prototype']['capitalize'] = function () {
    return this['charAt'](0)['toUpperCase']() + this['slice'](1)
  };

  $['fn']['serializeObject'] = function () {
    var _0x88b7x41 = {};
    var _0x88b7x42 = this['serializeArray']();
    $['each'](_0x88b7x42, function () {
      if (_0x88b7x41[this['name']] !== undefined) {
        if (!_0x88b7x41[this['name']]['push']) {
          _0x88b7x41[this['name']] = [_0x88b7x41[this['name']]]
        };
        _0x88b7x41[this['name']]['push'](this['value'] || '')
      } else {
        _0x88b7x41[this['name']] = this['value'] || ''
      }
    });
    return _0x88b7x41
  };

  var _0x88b7x43 = setInterval(function () {
    if (window != undefined){
      if($('.nui_main_menu')['length'] && !$['isEmptyObject'](ITowns['towns'])){
        clearInterval(_0x88b7x43);
        Autobot['initWindow']();
        Autobot['initMapTownFeature']();
        $['getScript'](Autobot['scriptDomain']+'Evaluate.js',function(){
          $['when']($['getScript'](Autobot['scriptDomain']+'DataExchanger.js'),$['getScript'](Autobot['scriptDomain']+'ConsoleLog.js'),$['getScript'](Autobot['scriptDomain']+'FormBuilder.js'),$['getScript'](Autobot['scriptDomain']+'ModuleManager.js'),$['getScript'](Autobot['scriptDomain']+'Assistant.js'),$.Deferred(function(_0x88b7x44){$(_0x88b7x44['resolve'])}))['done'](function(){
            Autobot['init']()
          });
        });
      } else {
        if(/grepolis\.com\/start\?nosession/g['test'](window['location']['href'])){
          clearInterval(_0x88b7x43);
          $['getScript'](Autobot['scriptDomain']+'Evaluate.js',function(){
            $['when']($['getScript'](Autobot['scriptDomain']+'DataExchanger.js'),$['getScript'](Autobot['scriptDomain']+'Redirect.js'),$.Deferred(function(_0x88b7x44){$(_0x88b7x44['resolve'])}))['done'](function(){
              Autobot['checkAutoRelogin']()
            });
          });
        }
      }
    }
  },1000)
})();
