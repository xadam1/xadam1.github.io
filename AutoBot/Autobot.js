var Autobot = {
    title: 'Autobot',
    version: '3.1',
    domain: window['location']['protocol'] + '//bot.grepobot.com/',
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
    init: function() {
        ConsoleLog.Log('Initialize Autobot', 0);
        Autobot['authenticate']();
        Autobot['obServer']();
        Autobot['isActive']();
        Autobot['setToolbox']();
        Autobot['initAjax']();
        Autobot['initMapTownFeature']();
        Autobot['fixMessage']();
        Assistant['init']()
    },
    setToolbox: function() {
        Autobot['toolbox_element'] = $('.nui_bot_toolbox')
    },
    authenticate: function() {
        DataExchanger.Auth('login', Autobot.Account, ModuleManager['callbackAuth'])
    },
    obServer: function() {
        $.Observer(GameEvents['notification']['push'])['subscribe']('GRCRTNotification', function() {
            $('#notification_area>.notification.getPremiumNotification')['on']('click', function() {
                Autobot['getPremium']()
            })
        })
    },
    initWnd: function() {
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
            var _0xe20bx2 = Autobot['botWnd']['getJQElement']();
            _0xe20bx2['append']($('<div/>', {
                "\x63\x6C\x61\x73\x73": 'menu_wrapper',
                "\x73\x74\x79\x6C\x65": 'left: 78px; right: 14px'
            })['append']($('<ul/>', {
                "\x63\x6C\x61\x73\x73": 'menu_inner'
            })['prepend'](Autobot['addMenuItem']('AUTHORIZE', 'Account', 'Account'))['prepend'](Autobot['addMenuItem']('CONSOLE', 'Assistant', 'Assistant'))['prepend'](Autobot['addMenuItem']('ASSISTANT', 'Console', 'Console'))['prepend'](Autobot['addMenuItem']('SUPPORT', 'Support', 'Support'))));
            if (typeof Autoattack !== 'undefined') {
                _0xe20bx2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('ATTACKMODULE', 'Attack', 'Autoattack'))
            };
            if (typeof Autobuild !== 'undefined') {
                _0xe20bx2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('CONSTRUCTMODULE', 'Build', 'Autobuild'))
            };
            if (typeof Autoculture !== 'undefined') {
                _0xe20bx2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('CULTUREMODULE', 'Culture', 'Autoculture'))
            };
            if (typeof Autofarm !== 'undefined') {
                _0xe20bx2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('FARMMODULE', 'Farm', 'Autofarm'))
            };
            $('#Autobot-AUTHORIZE')['click']()
        }
    },
    addMenuItem: function(_0xe20bx3, _0xe20bx4, _0xe20bx5) {
        return $('<li/>')['append']($('<a/>', {
            "\x63\x6C\x61\x73\x73": 'submenu_link',
            "\x68\x72\x65\x66": '#',
            "\x69\x64": 'Autobot-' + _0xe20bx3,
            "\x72\x65\x6C": _0xe20bx5
        })['click'](function() {
            Autobot['botWnd']['getJQElement']()['find']('li a.submenu_link')['removeClass']('active');
            $(this)['addClass']('active');
            Autobot['botWnd']['setContent2'](Autobot['getContent']($(this)['attr']('rel')));
            if ($(this)['attr']('rel') == 'Console') {
                var _0xe20bx6 = $('.terminal');
                var _0xe20bx7 = $('.terminal-output')[0]['scrollHeight'];
                _0xe20bx6['scrollTop'](_0xe20bx7)
            }
        })['append'](function() {
            return _0xe20bx5 != 'Support' ? $('<span/>', {
                "\x63\x6C\x61\x73\x73": 'left'
            })['append']($('<span/>', {
                "\x63\x6C\x61\x73\x73": 'right'
            })['append']($('<span/>', {
                "\x63\x6C\x61\x73\x73": 'middle'
            })['html'](_0xe20bx4))) : '<a id="help-button" onclick="return false;" class="confirm"></a>'
        }))
    },
    getContent: function(_0xe20bx8) {
        if (_0xe20bx8 == 'Console') {
            return ConsoleLog['contentConsole']()
        } else {
            if (_0xe20bx8 == 'Account') {
                return Autobot['contentAccount']()
            } else {
                if (_0xe20bx8 == 'Support') {
                    return Autobot['contentSupport']()
                } else {
                    if (typeof window[_0xe20bx8] != 'undefined') {
                        return window[_0xe20bx8]['contentSettings']()
                    };
                    return ''
                }
            }
        }
    },
    contentAccount: function() {
        var _0xe20bx9 = {
            "\x4E\x61\x6D\x65\x3A": Game['player_name'],
            "\x57\x6F\x72\x6C\x64\x3A": Game['world_id'],
            "\x52\x61\x6E\x6B\x3A": Game['player_rank'],
            "\x54\x6F\x77\x6E\x73\x3A": Game['player_villages'],
            "\x4C\x61\x6E\x67\x75\x61\x67\x65\x3A": Game['locale_lang'],
            "\x50\x72\x65\x6D\x69\x75\x6D\x3A\x20": (Autobot['premium_time'] - Timestamp['now']()) >= 0 ? Autobot['secondsToTime'](Autobot['premium_time'] - Timestamp['now']()) + '<span id="get_premium" class="open_premium_icon" onclick="Autobot.getPremium();"></span>' : 'No premium' + '<span id="get_premium" class="open_premium_icon" onclick="Autobot.getPremium();"></span>',
            "\x54\x72\x69\x61\x6C\x3A": ((Autobot['trial_time'] - Timestamp['now']()) >= 0 ? Autobot['secondsToTime'](Autobot['trial_time'] - Timestamp['now']()) : 'Trial is over') + (Autobot['facebook_like'] == 0 ? '<a href="#" id="get_7days" onclick="Autobot.botFacebookWnd();">Get 3 free days!</a>' : '')
        };
        var _0xe20bxa = $('<table/>', {
            "\x63\x6C\x61\x73\x73": 'game_table layout_main_sprite',
            "\x63\x65\x6C\x6C\x73\x70\x61\x63\x69\x6E\x67": '0',
            "\x77\x69\x64\x74\x68": '100%'
        })['append'](function() {
            var _0xe20bxb = 0;
            var _0xe20bxc = $('<tbody/>');
            $['each'](_0xe20bx9, function(_0xe20bxd, _0xe20bxe) {
                _0xe20bxc['append']($('<tr/>', {
                    "\x63\x6C\x61\x73\x73": _0xe20bxb % 2 ? 'game_table_even' : 'game_table_odd'
                })['append']($('<td/>', {
                    "\x73\x74\x79\x6C\x65": 'background-color: #DFCCA6;width: 30%;'
                })['html'](_0xe20bxd))['append']($('<td/>')['html'](_0xe20bxe)));
                _0xe20bxb++
            });
            return _0xe20bxc
        });
        var _0xe20bxf = FormBuilder['gameWrapper']('Account', 'account_property_wrapper', _0xe20bxa, 'margin-bottom:9px;')[0]['outerHTML'];
        _0xe20bxf += $('<div/>', {
            "\x69\x64": 'grepobanner',
            "\x73\x74\x79\x6C\x65": ''
        })[0]['outerHTML'];
        return _0xe20bxf
    },
    contentSupport: function() {
        return $('<fieldset/>', {
            "\x69\x64": 'Support_tab',
            "\x73\x74\x79\x6C\x65": 'float:left; width:472px;height: 270px;'
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
        })['on']('click', function() {
            var _0xe20bx10 = $('#Support_tab')['serializeObject']();
            var _0xe20bx11 = false;
            if (typeof _0xe20bx10['support_input_email'] === 'undefined' || _0xe20bx10['support_input_email'] == '') {
                _0xe20bx11 = 'Please enter your email.'
            } else {
                if (typeof _0xe20bx10['support_input_subject'] === 'undefined' || _0xe20bx10['support_input_subject'] == '') {
                    _0xe20bx11 = 'Please enter a subject.'
                } else {
                    if (typeof _0xe20bx10['support_textarea'] === 'undefined' || _0xe20bx10['support_textarea'] == '') {
                        _0xe20bx11 = 'Please enter a message.'
                    } else {
                        if (typeof _0xe20bx10['support_input_email'] !== 'undefined' && !/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/ ['test'](_0xe20bx10['support_input_email'])) {
                            _0xe20bx11 = 'Your email is not valid!'
                        }
                    }
                }
            };
            if (_0xe20bx11) {
                HumanMessage['error'](_0xe20bx11)
            } else {
                DataExchanger.Auth('supportEmail', $['extend']({
                    csrfToken: Autobot['Account']['csrfToken'],
                    player_name: Autobot['Account']['player_name'],
                    player_id: Autobot['Account']['player_id'],
                    world_id: Autobot['Account']['world_id']
                }, _0xe20bx10), function(_0xe20bx9) {
                    if (_0xe20bx9['success']) {
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
    checkAlliance: function() {
        if (!$('.allianceforum.main_menu_item')['hasClass']('disabled')) {
            DataExchanger['members_show'](function(_0xe20bx9) {
                if (_0xe20bx9['plain']['html'] != undefined) {
                    jQuery['each']($(_0xe20bx9['plain']['html'])['find']('#ally_members_body .ally_name a'), function() {
                        var _0xe20bxe = atob($(this)['attr']('href'));
                        console['log'](JSON['parse'](_0xe20bxe['substr'](0, _0xe20bxe['length'] - 3)))
                    })
                }
            })
        }
    },
    fixMessage: function() {
        var _0xe20bx12 = function(_0xe20bx13) {
            return function() {
                _0xe20bx13['apply'](this, arguments);
                $(window)['unbind']('click')
            }
        };
        HumanMessage['_initialize'] = _0xe20bx12(HumanMessage._initialize)
    },
    getPremium: function() {
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
            var _0xe20bx14 = $('<div/>', {
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
            })['html']('\u20AC&nbsp;4,99')))['append']($('<li/>')['append']($('<span/>', {
                class: 'amount'
            })['html']('2 Month'))['append']($('<span/>', {
                class: 'price'
            })['html']('\u20AC&nbsp;9,99'))['append']($('<div/>', {
                class: 'referenceAmount'
            })['append']($('<div/>', {
                class: 'reference',
                style: 'transform: rotate(17deg);'
            })['html']('+12 Days&nbsp;'))))['append']($('<li/>')['append']($('<span/>', {
                class: 'amount'
            })['html']('4 Months'))['append']($('<span/>', {
                class: 'price'
            })['html']('\u20AC&nbsp;19,99'))['append']($('<div/>', {
                class: 'referenceAmount'
            })['append']($('<div/>', {
                class: 'reference',
                style: 'transform: rotate(17deg);'
            })['html']('+36 Days&nbsp;'))))['append']($('<li/>')['append']($('<span/>', {
                class: 'amount'
            })['html']('10 Months'))['append']($('<span/>', {
                class: 'price'
            })['html']('\u20AC&nbsp;49,99'))['append']($('<div/>', {
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
            })['html']('1 month for only \u20AC4,99'))['append']($('<span/>', {
                class: 'button'
            })['html']('Buy'))));
            Autobot['botPremWnd']['setContent2'](_0xe20bx14);
            var _0xe20bx15 = 0;
            $('#time_options li')['on']('click', function() {
                $('#time_options li')['removeClass']('active');
                $(this)['addClass']('active');
                _0xe20bx15 = $(this)['index']();
                var _0xe20bx16 = $('#payment #information .text');
                if (_0xe20bx15 == 0) {
                    _0xe20bx16['html']('1 month for only \u20AC4,99')
                } else {
                    if (_0xe20bx15 == 1) {
                        _0xe20bx16['html']('2 month +12 days for only \u20AC9,99')
                    } else {
                        if (_0xe20bx15 == 2) {
                            _0xe20bx16['html']('4 months +36 days for only \u20AC19,99')
                        } else {
                            if (_0xe20bx15 == 3) {
                                _0xe20bx16['html']('10 months +120 days for only \u20AC49,99')
                            }
                        }
                    }
                }
            });
            $('#payment #information')['on']('click', function() {
                var _0xe20bx17 = window['open'](Autobot['domain'] + 'paypal/process.php?payment=' + _0xe20bx15 + '&player_id=' + Autobot['Account']['player_id'], 'grepolis_payment', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,height=650,width=800');
                var _0xe20bx18 = setInterval(function() {
                    if (!_0xe20bx17 || _0xe20bx17['closed']) {
                        clearInterval(_0xe20bx18);
                        Autobot['authenticate']()
                    }
                }, 500)
            })
        }
    },
    botFacebookWnd: function() {
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
            var _0xe20bx14 = $('<div/>', {
                id: 'facebook_wnd'
            })['append']('<span class="like-share-text">Like & share and get <b>3 days</b> free premium.</span><a href="#" class="fb-share"><span class="fb-text">Share</spanclass></a><div class="fb_like"><div class="fb-like" data-href="https://www.facebook.com/BotForGrepolis/" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div></div>');
            Autobot['facebookWnd']['setContent2'](_0xe20bx14);
            $('.ui-dialog #facebook_wnd')['closest']('.gpwindow_content')['css']({
                "\x6C\x65\x66\x74": '-9px',
                "\x72\x69\x67\x68\x74": '-9px',
                "\x74\x6F\x70": '35px'
            });
            var _0xe20bx19 = false;
            var _0xe20bx1a = false;
            var _0xe20bx1b = function() {
                if (_0xe20bx19 || _0xe20bx1a) {
                    Autobot['upgrade3Days']()
                };
                if (_0xe20bx19 && _0xe20bx1a) {
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
                window['fbAsyncInit'] = function() {
                    FB['init']({
                        appId: '1505555803075328',
                        xfbml: true,
                        version: 'v2.4'
                    });
                    FB['Event']['subscribe']('edge.create', function(_0xe20bx1c) {
                        _0xe20bx1a = true;
                        _0xe20bx1b()
                    });
                    FB['Event']['subscribe']('edge.remove', function(_0xe20bx1c) {
                        _0xe20bx1a = false
                    })
                }
            };
            if ($('#facebook-jssdk')['length'] <= 0) {
                (function(_0xe20bx1d, _0xe20bx1e, _0xe20bx3) {
                    var _0xe20bx1f, _0xe20bx20 = _0xe20bx1d['getElementsByTagName'](_0xe20bx1e)[0];
                    if (_0xe20bx1d['getElementById'](_0xe20bx3)) {
                        return
                    };
                    _0xe20bx1f = _0xe20bx1d['createElement'](_0xe20bx1e);
                    _0xe20bx1f['id'] = _0xe20bx3;
                    _0xe20bx1f['src'] = '//connect.facebook.net/en_US/sdk.js';
                    _0xe20bx20['parentNode']['insertBefore'](_0xe20bx1f, _0xe20bx20)
                }(document, 'script', 'facebook-jssdk'))
            } else {
                FB['XFBML']['parse']()
            };
            $('#facebook_wnd .fb-share')['on']('click', function() {
                FB['ui']({
                    method: 'share',
                    href: 'https://www.facebook.com/BotForGrepolis/'
                }, function(_0xe20bx1c) {
                    if (_0xe20bx1c && !_0xe20bx1c['error_code']) {
                        _0xe20bx19 = true;
                        _0xe20bx1b()
                    }
                })
            })
        }
    },
    upgrade3Days: function() {
        DataExchanger.Auth('upgrade3Days', Autobot.Account, function(_0xe20bx9) {
            if (_0xe20bx9['success']) {
                DataExchanger.Auth('login', Autobot.Account, ModuleManager['callbackAuth'])
            }
        })
    },
    initAjax: function() {
        $(document)['ajaxComplete'](function(_0xe20bx21, _0xe20bx22, _0xe20bx23) {
            if (_0xe20bx23['url']['indexOf'](Autobot['domain']) == -1 && _0xe20bx23['url']['indexOf']('/game/') != -1 && _0xe20bx22['readyState'] == 4 && _0xe20bx22['status'] == 200) {
                var _0xe20bx24 = _0xe20bx23['url']['split']('?');
                var _0xe20bx25 = _0xe20bx24[0]['substr'](6) + '/' + _0xe20bx24[1]['split']('&')[1]['substr'](7);
                if (typeof Autobuild !== 'undefined') {
                    Autobuild['calls'](_0xe20bx25)
                };
                if (typeof Autoattack !== 'undefined') {
                    Autoattack['calls'](_0xe20bx25, _0xe20bx22['responseText'])
                }
            }
        })
    },
    verifyEmail: function() {
        if (Autobot['isLogged']) {
            DataExchanger['email_validation'](function(_0xe20bx9) {
                if (_0xe20bx9['plain']['html'] != undefined) {
                    DataExchanger.Auth('verifyEmail', {
                        key: btoa(Autobot['stringify']({
                            player_id: Autobot['Account']['player_id'],
                            player_email: $(_0xe20bx9['plain']['html'])['find']('#current_email_adress')['html']()
                        }))
                    }, function(_0xe20bx9) {
                        if (_0xe20bx9['success'] != undefined) {
                            Autobot['arrowActivated']()
                        }
                    })
                }
            })
        }
    },
    randomize: function(_0xe20bx26, _0xe20bx27) {
        return Math['floor'](Math['random']() * (_0xe20bx27 - _0xe20bx26 + 1)) + _0xe20bx26
    },
    secondsToTime: function(_0xe20bx28) {
        var _0xe20bx29 = Math['floor'](_0xe20bx28 / 86400);
        var _0xe20bx2a = Math['floor']((_0xe20bx28 % 86400) / 3600);
        var _0xe20bx2b = Math['floor'](((_0xe20bx28 % 86400) % 3600) / 60);
        return (_0xe20bx29 ? _0xe20bx29 + ' days ' : '') + (_0xe20bx2a ? _0xe20bx2a + ' hours ' : '') + (_0xe20bx2b ? _0xe20bx2b + ' minutes ' : '')
    },
    timeToSeconds: function(_0xe20bx2c) {
        var _0xe20bx2d = _0xe20bx2c['split'](':'),
            _0xe20bx1e = 0,
            _0xe20bx2e = 1;
        while (_0xe20bx2d['length'] > 0) {
            _0xe20bx1e += _0xe20bx2e * parseInt(_0xe20bx2d['pop'](), 10);
            _0xe20bx2e *= 60
        };
        return _0xe20bx1e
    },
    arrowActivated: function() {
        var _0xe20bx2f = $('<div/>', {
            "\x63\x6C\x61\x73\x73": 'helpers helper_arrow group_quest d_w animate bounce',
            "\x64\x61\x74\x61\x2D\x64\x69\x72\x65\x63\x74\x69\x6F\x6E": 'w',
            "\x73\x74\x79\x6C\x65": 'top: 0; left: 360px; visibility: visible; display: none;'
        });
        Autobot['toolbox_element']['append'](_0xe20bx2f);
        _0xe20bx2f['show']()['animate']({
            left: '138px'
        }, 'slow')['delay'](10000)['fadeOut']('normal');
        setTimeout(function() {
            Autobot['botFacebookWnd']()
        }, 25000)
    },
    createNotification: function(_0xe20bx30, _0xe20bx31) {
        var _0xe20bx32 = (typeof Layout['notify'] == 'undefined') ? new NotificationHandler() : Layout;
        _0xe20bx32['notify']($('#notification_area>.notification')['length'] + 1, _0xe20bx30, '<span><b>' + 'Autobot' + '</b></span>' + _0xe20bx31 + '<span class=\'small notification_date\'>' + 'Version ' + Autobot['version'] + '</span>')
    },
    toHHMMSS: function(_0xe20bx33) {
        var _0xe20bx34 = ~~(_0xe20bx33 / 3600);
        var _0xe20bx35 = ~~((_0xe20bx33 % 3600) / 60);
        var _0xe20bx36 = _0xe20bx33 % 60;
        ret = '';
        if (_0xe20bx34 > 0) {
            ret += '' + _0xe20bx34 + ':' + (_0xe20bx35 < 10 ? '0' : '')
        };
        ret += '' + _0xe20bx35 + ':' + (_0xe20bx36 < 10 ? '0' : '');
        ret += '' + _0xe20bx36;
        return ret
    },
    stringify: function(_0xe20bx37) {
        var _0xe20bx38 = typeof _0xe20bx37;
        if (_0xe20bx38 === 'string') {
            return '"' + _0xe20bx37 + '"'
        };
        if (_0xe20bx38 === 'boolean' || _0xe20bx38 === 'number') {
            return _0xe20bx37
        };
        if (_0xe20bx38 === 'function') {
            return _0xe20bx37.toString()
        };
        var _0xe20bx39 = [];
        for (var _0xe20bx3a in _0xe20bx37) {
            _0xe20bx39['push']('"' + _0xe20bx3a + '":' + this['stringify'](_0xe20bx37[_0xe20bx3a]))
        };
        return '{' + _0xe20bx39['join'](',') + '}'
    },
    isActive: function() {
        setTimeout(function() {
            DataExchanger.Auth('isActive', Autobot.Account, Autobot['isActive'])
        }, 180000)
    },
    town_map_info: function(_0xe20bx3b, _0xe20bx3c) {
        if (_0xe20bx3b != undefined && _0xe20bx3b['length'] > 0 && _0xe20bx3c['player_name']) {
            for (var _0xe20bx3d = 0; _0xe20bx3d < _0xe20bx3b['length']; _0xe20bx3d++) {
                if (_0xe20bx3b[_0xe20bx3d]['className'] == 'flag town') {
                    if (typeof Assistant !== 'undefined') {
                        if (Assistant['settings']['town_names']) {
                            $(_0xe20bx3b[_0xe20bx3d])['addClass']('active_town')
                        };
                        if (Assistant['settings']['player_name']) {
                            $(_0xe20bx3b[_0xe20bx3d])['addClass']('active_player')
                        };
                        if (Assistant['settings']['alliance_name']) {
                            $(_0xe20bx3b[_0xe20bx3d])['addClass']('active_alliance')
                        }
                    };
                    $(_0xe20bx3b[_0xe20bx3d])['append']('<div class="player_name">' + (_0xe20bx3c['player_name'] || '') + '</div>');
                    $(_0xe20bx3b[_0xe20bx3d])['append']('<div class="town_name">' + _0xe20bx3c['name'] + '</div>');
                    $(_0xe20bx3b[_0xe20bx3d])['append']('<div class="alliance_name">' + (_0xe20bx3c['alliance_name'] || '') + '</div>');
                    break
                }
            }
        };
        return _0xe20bx3b
    },
    checkPremium: function(_0xe20bx3e) {
        return $('.advisor_frame.' + _0xe20bx3e + ' div')['hasClass'](_0xe20bx3e + '_active')
    },
    initWindow: function() {
        $('.nui_main_menu')['css']('top', '282px');
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
        })['on']('click', function() {
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
    initMapTownFeature: function() {
        var _0xe20bx3f = function(_0xe20bx13) {
            return function() {
                var _0xe20bx3b = _0xe20bx13['apply'](this, arguments);
                return Autobot['town_map_info'](_0xe20bx3b, arguments[0])
            }
        };
        MapTiles['createTownDiv'] = _0xe20bx3f(MapTiles['createTownDiv'])
    },
    checkAutoRelogin: function() {
        if (typeof $['cookie']('pid') !== 'undefined' && typeof $['cookie']('ig_conv_last_site') !== 'undefined') {
            var _0xe20bx40 = $['cookie']('ig_conv_last_site')['match'](/\/\/(.*?)\.grepolis\.com/g)[0]['replace']('//', '')['replace']('.grepolis.com', '');
            DataExchanger.Auth('checkAutorelogin', {
                player_id: $['cookie']('pid'),
                world_id: _0xe20bx40
            }, function(_0xe20bx9) {
                if (_0xe20bx9 != 0) {
                    setTimeout(function() {
                        DataExchanger['login_to_game_world'](_0xe20bx40)
                    }, _0xe20bx9 * 1000)
                }
            })
        }
    }
};
(function() {
        String['prototype']['capitalize'] = function() {
            return this['charAt'](0)['toUpperCase']() + this['slice'](1)
        };
        $['fn']['serializeObject'] = function() {
            var _0xe20bx41 = {};
            var _0xe20bx42 = this['serializeArray']();
            $['each'](_0xe20bx42, function() {
                if (_0xe20bx41[this['name']] !== undefined) {
                    if (!_0xe20bx41[this['name']]['push']) {
                        _0xe20bx41[this['name']] = [_0xe20bx41[this['name']]]
                    };
                    _0xe20bx41[this['name']]['push'](this['value'] || '')
                } else {
                    _0xe20bx41[this['name']] = this['value'] || ''
                }
            });
            return _0xe20bx41
        };
        var _0xe20bx43 = setInterval(function() {
                    if (window['']!= undefined){if($('.nui_main_menu ')['
                            length ']&&  !$['
                            isEmptyObject '](ITowns['
                            towns '])){clearInterval(_0xe20bx43);Autobot['
                            initWindow ']();Autobot['
                            initMapTownFeature ']();$['
                            getScript '](Autobot['
                            domain ']+ '
                            Evaluate.js ',function(){$['
                            when ']($['
                            getScript '](Autobot['
                            domain ']+ '
                            DataExchanger.js '),$['
                            getScript '](Autobot['
                            domain ']+ '
                            ConsoleLog.js '),$['
                            getScript '](Autobot['
                            domain ']+ '
                            FormBuilder.js '),$['
                            getScript '](Autobot['
                            domain ']+ '
                            ModuleManager.js '),$['
                            getScript '](Autobot['
                            domain ']+ '
                            Assistant.js '),$.Deferred(function(_0xe20bx44){$(_0xe20bx44['
                            resolve '])}))['
                            done '](function(){Autobot['
                            init ']()})})}else {if(/grepolis\.com\/start\?nosession/g['
                            test '](window['
                            location ']['
                            href '])){clearInterval(_0xe20bx43);$['
                            getScript '](Autobot['
                            domain ']+ '
                            Evaluate.js ',function(){$['
                            when ']($['
                            getScript '](Autobot['
                            domain ']+ '
                            DataExchanger.js '),$['
                            getScript '](Autobot['
                            domain ']+ '
                            Redirect.js '),$.Deferred(function(_0xe20bx44){$(_0xe20bx44['
                            resolve '])}))['
                            done '](function(){Autobot['
                            checkAutoRelogin ']()})})}}}},100)})()]!= undefined){if($('.nui_main_menu ')['
                            length ']&&  !$['
                            isEmptyObject '](ITowns['
                            towns '])){clearInterval(_0xe20bx43);Autobot['
                            initWindow ']();Autobot['
                            initMapTownFeature ']();$['
                            getScript '](Autobot['
                            domain ']+ '
                            Evaluate.js ',function(){$['
                            when ']($['
                            getScript '](Autobot['
                            domain ']+ '
                            DataExchanger.js '),$['
                            getScript '](Autobot['
                            domain ']+ '
                            ConsoleLog.js '),$['
                            getScript '](Autobot['
                            domain ']+ '
                            FormBuilder.js '),$['
                            getScript '](Autobot['
                            domain ']+ '
                            ModuleManager.js '),$['
                            getScript '](Autobot['
                            domain ']+ '
                            Assistant.js '),$.Deferred(function(_0xe20bx44){$(_0xe20bx44['
                            resolve '])}))['
                            done '](function(){Autobot['
                            init ']()})})}else {if(/grepolis\.com\/start\?nosession/g['
                            test '](window['
                            location ']['
                            href '])){clearInterval(_0xe20bx43);$['
                            getScript '](Autobot['
                            domain ']+ '
                            Evaluate.js ',function(){$['
                            when ']($['
                            getScript '](Autobot['
                            domain ']+ '
                            DataExchanger.js '),$['
                            getScript '](Autobot['
                            domain ']+ '
                            Redirect.js '),$.Deferred(function(_0xe20bx44){$(_0xe20bx44['
                            resolve '])}))['
                            done '](function(){Autobot['
                            checkAutoRelogin ']()})})}}}},100)})()