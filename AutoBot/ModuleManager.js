ModuleManager = {
  models: {
    Town: function() {
      this['key'] = null;
      this['id'] = null;
      this['name'] = null;
      this['farmTowns'] = {};
      this['relatedTowns'] = [];
      this['currentFarmCount'] = 0;
      this['modules'] = {
        Autofarm: {
          isReadyTime: 0
        },
        Autoculture: {
          isReadyTime: 0
        },
        Autobuild: {
          isReadyTime: 0
        }
      };
      this['startFarming'] = function() {
        Autofarm['startFarming'](this)
      };
      this['startCulture'] = function() {
        Autoculture['startCulture'](this)
      };
      this['startBuild'] = function() {
        Autobuild['startBuild'](this)
      }
    }
  },
  Queue: {
    total: 0,
    queue: [],
    add: function(_0xa6b2x1) {
      this['total']++;
      this['queue']['push'](_0xa6b2x1)
    },
    start: function() {
      this['next']()
    },
    stop: function() {
      this['queue'] = []
    },
    isRunning: function() {
      return this['queue']['length'] > 0 || this['total'] > 0
    },
    next: function() {
      ModuleManager['updateTimer']();
      var _0xa6b2x2 = this['queue']['shift']();
      if (_0xa6b2x2) {
        _0xa6b2x2['fx']()
      } else {
        if (this['queue']['length'] <= 0) {
          this['total'] = 0;
          ModuleManager['finished']()
        }
      }
    }
  },
  currentTown: null,
  playerTowns: [],
  interval: false,
  modules: {
    Autofarm: {
      isOn: false
    },
    Autoculture: {
      isOn: false
    },
    Autobuild: {
      isOn: false
    },
    Autoattack: {
      isOn: false
    }
  },
  init: function() {
    ModuleManager['loadPlayerTowns']();
    ModuleManager['initButtons']();
    ModuleManager['initTimer']()
  },
  start: function() {
    var _0xa6b2x3 = false;
    var _0xa6b2x4 = null;
    $['each'](ModuleManager['playerTowns'], function(_0xa6b2x5, _0xa6b2x6) {
      if (typeof Autofarm !== 'undefined') {
        var _0xa6b2x7 = Autofarm['checkReady'](_0xa6b2x6);
        if (_0xa6b2x7 == true) {
          _0xa6b2x3 = true;
          ModuleManager['Queue']['add']({
            townId: _0xa6b2x6['id'],
            fx: function() {
              _0xa6b2x6['startFarming']()
            }
          })
        } else {
          if (_0xa6b2x7 != false && (_0xa6b2x4 == null || _0xa6b2x7 < _0xa6b2x4)) {
            _0xa6b2x4 = _0xa6b2x7
          }
        }
      };
      if (typeof Autoculture !== 'undefined') {
        var _0xa6b2x8 = Autoculture['checkReady'](_0xa6b2x6);
        if (_0xa6b2x8 == true) {
          _0xa6b2x3 = true;
          ModuleManager['Queue']['add']({
            townId: _0xa6b2x6['id'],
            fx: function() {
              _0xa6b2x6['startCulture']()
            }
          })
        } else {
          if (_0xa6b2x8 != false && (_0xa6b2x4 == null || _0xa6b2x8 < _0xa6b2x4)) {
            _0xa6b2x4 = _0xa6b2x8
          }
        }
      };
      if (typeof Autobuild !== 'undefined') {
        var _0xa6b2x9 = Autobuild['checkReady'](_0xa6b2x6);
        if (_0xa6b2x9 == true) {
          _0xa6b2x3 = true;
          ModuleManager['Queue']['add']({
            townId: _0xa6b2x6['id'],
            fx: function() {
              _0xa6b2x6['startBuild']()
            }
          })
        } else {
          if (_0xa6b2x9 != false && (_0xa6b2x4 == null || _0xa6b2x9 < _0xa6b2x4)) {
            _0xa6b2x4 = _0xa6b2x9
          }
        }
      }
    });
    if (_0xa6b2x4 === null && !_0xa6b2x3) {
      ConsoleLog.Log('Nothing is ready yet!', 0);
      ModuleManager['startTimer'](30, function() {
        ModuleManager['start']()
      })
    } else {
      if (!_0xa6b2x3) {
        var _0xa6b2xa = (_0xa6b2x4 - Timestamp['now']()) + 10;
        ModuleManager['startTimer'](_0xa6b2xa, function() {
          ModuleManager['start']()
        })
      } else {
        ModuleManager['Queue']['start']()
      }
    }
  },
  stop: function() {
    clearInterval(ModuleManager['interval']);
    ModuleManager['Queue']['stop']();
    $('#time_autobot .caption .value_container .curr')['html']('Stopped')
  },
  finished: function() {
    ModuleManager['start']()
  },
  initTimer: function() {
    $('.nui_main_menu')['css']('top', '276px');
    $('#time_autobot')['append'](FormBuilder['timerBoxSmall']({
      "\x69\x64": 'Autofarm_timer',
      "\x73\x74\x79\x6C\x65\x73": '',
      "\x74\x65\x78\x74": 'Start Autobot'
    }))['show']()
  },
  updateTimer: function(_0xa6b2xb, _0xa6b2xc) {
    var _0xa6b2xd = 0;
    if (typeof _0xa6b2xb !== 'undefined' && typeof _0xa6b2xc !== 'undefined') {
      _0xa6b2xd = (((ModuleManager['Queue']['total'] - (ModuleManager['Queue']['queue']['length'] + 1)) + (_0xa6b2xc / _0xa6b2xb)) / ModuleManager['Queue']['total'] * 100)
    } else {
      _0xa6b2xd = (((ModuleManager['Queue']['total'] - ModuleManager['Queue']['queue']['length'])) / ModuleManager['Queue']['total'] * 100)
    };
    if (!isNaN(_0xa6b2xd)) {
      $('#time_autobot .progress .indicator')['width'](_0xa6b2xd + '%');
      $('#time_autobot .caption .value_container .curr')['html'](Math['round'](_0xa6b2xd) + '%')
    }
  },
  checkAutostart: function() {
    if (Autofarm['settings']['autostart']) {
      ModuleManager['modules']['Autofarm']['isOn'] = true;
      var _0xa6b2xe = $('#Autofarm_onoff');
      _0xa6b2xe['addClass']('on');
      _0xa6b2xe['find']('span')['mousePopup'](new MousePopup('Stop Autofarm'))
    };
    if (Autoculture['settings']['autostart']) {
      ModuleManager['modules']['Autoculture']['isOn'] = true;
      var _0xa6b2xe = $('#Autoculture_onoff');
      _0xa6b2xe['addClass']('on');
      _0xa6b2xe['find']('span')['mousePopup'](new MousePopup('Stop Autoculture'))
    };
    if (Autobuild['settings']['autostart']) {
      ModuleManager['modules']['Autobuild']['isOn'] = true;
      var _0xa6b2xe = $('#Autobuild_onoff');
      _0xa6b2xe['addClass']('on');
      _0xa6b2xe['find']('span')['mousePopup'](new MousePopup('Stop Autobuild'))
    };
    if (Autofarm['settings']['autostart'] || Autoculture['settings']['autostart'] || Autobuild['settings']['autostart']) {
      ModuleManager['start']()
    }
  },
  startTimer: function(_0xa6b2xf, _0xa6b2x10) {
    var _0xa6b2x11 = _0xa6b2xf;
    ModuleManager['interval'] = setInterval(function() {
      $('#time_autobot .caption .value_container .curr')['html'](Autobot['toHHMMSS'](_0xa6b2xf));
      $('#time_autobot .progress .indicator')['width']((_0xa6b2x11 - _0xa6b2xf) / _0xa6b2x11 * 100 + '%');
      _0xa6b2xf--;
      if (_0xa6b2xf < 0) {
        clearInterval(ModuleManager['interval']);
        _0xa6b2x10()
      }
    }, 1000)
  },
  initButtons: function(_0xa6b2x12) {
    var _0xa6b2xe = $('#' + _0xa6b2x12 + '_onoff');
    _0xa6b2xe['removeClass']('disabled');
    _0xa6b2xe['on']('click', function(_0xa6b2x13) {
      _0xa6b2x13['preventDefault']();
      if (_0xa6b2x12 == 'Autoattack' && !Autobot['checkPremium']('captain')) {
        HumanMessage['error'](Game['premium_data']['captain']['name'] + ' ' + DM['getl10n']('premium')['advisors']['not_activated']['toLowerCase']() + '.');
        return false
      };
      if (ModuleManager['modules'][_0xa6b2x12]['isOn'] == true) {
        ModuleManager['modules'][_0xa6b2x12]['isOn'] = false;
        _0xa6b2xe['removeClass']('on');
        _0xa6b2xe['find']('span')['mousePopup'](new MousePopup('Start ' + _0xa6b2x12));
        HumanMessage['success'](_0xa6b2x12 + ' is deactivated.');
        ConsoleLog.Log(_0xa6b2x12 + ' is deactivated.', 0);
        if (_0xa6b2x12 == 'Autofarm') {
          Autofarm['stop']()
        } else {
          if (_0xa6b2x12 == 'Autoculture') {
            Autoculture['stop']()
          } else {
            if (_0xa6b2x12 == 'Autobuild') {
              Autobuild['stop']()
            } else {
              if (_0xa6b2x12 == 'Autoattack') {
                Autoattack['stop']()
              }
            }
          }
        }
      } else {
        if (ModuleManager['modules'][_0xa6b2x12]['isOn'] == false) {
          _0xa6b2xe['addClass']('on');
          HumanMessage['success'](_0xa6b2x12 + ' is activated.');
          ConsoleLog.Log(_0xa6b2x12 + ' is activated.', 0);
          _0xa6b2xe['find']('span')['mousePopup'](new MousePopup('Stop ' + _0xa6b2x12));
          ModuleManager['modules'][_0xa6b2x12]['isOn'] = true;
          if (_0xa6b2x12 == 'Autoattack') {
            Autoattack['start']()
          }
        }
      };
      if (_0xa6b2x12 != 'Autoattack') {
        ModuleManager['checkWhatToStart']()
      }
    });
    _0xa6b2xe['find']('span')['mousePopup'](new MousePopup('Start ' + _0xa6b2x12))
  },
  checkWhatToStart: function() {
    var _0xa6b2x14 = 0;
    $['each'](ModuleManager['modules'], function(_0xa6b2x15, _0xa6b2x12) {
      if (_0xa6b2x12['isOn'] && _0xa6b2x12 != 'Autoattack') {
        _0xa6b2x14++
      }
    });
    if (_0xa6b2x14 == 0) {
      ModuleManager['stop']()
    } else {
      if (_0xa6b2x14 >= 0 && !ModuleManager['Queue']['isRunning']()) {
        clearInterval(ModuleManager['interval']);
        ModuleManager['start']()
      }
    }
  },
  loadPlayerTowns: function() {
    var _0xa6b2x5 = 0;
    $['each'](ITowns['towns'], function(_0xa6b2x16, _0xa6b2x17) {
      var _0xa6b2x18 = new ModuleManager['models']['Town'];
      _0xa6b2x18['key'] = _0xa6b2x5;
      _0xa6b2x18['id'] = _0xa6b2x17['id'];
      _0xa6b2x18['name'] = _0xa6b2x17['name'];
      $['each'](ITowns['towns'], function(_0xa6b2x16, _0xa6b2x19) {
        if (_0xa6b2x17['getIslandCoordinateX']() == _0xa6b2x19['getIslandCoordinateX']() && _0xa6b2x17['getIslandCoordinateY']() == _0xa6b2x19['getIslandCoordinateY']() && _0xa6b2x17['id'] != _0xa6b2x19['id']) {
          _0xa6b2x18['relatedTowns']['push'](_0xa6b2x19['id'])
        }
      });
      ModuleManager['playerTowns']['push'](_0xa6b2x18);
      _0xa6b2x5++
    });
    ModuleManager['playerTowns']['sort'](function(_0xa6b2x1a, _0xa6b2x1b) {
      var _0xa6b2x1c = _0xa6b2x1a['name'],
      _0xa6b2x1d = _0xa6b2x1b['name'];
      if (_0xa6b2x1c == _0xa6b2x1d) {
        return 0
      };
      return _0xa6b2x1c > _0xa6b2x1d ? 1 : -1
    })
  },
  callbackAuth: function(_0xa6b2x1e) {
    Autobot['isLogged'] = true;
    Autobot['trial_time'] = _0xa6b2x1e['trial_time'];
    Autobot['premium_time'] = _0xa6b2x1e['premium_time'];
    Autobot['facebook_like'] = _0xa6b2x1e['facebook_like'];
    if (_0xa6b2x1e['assistant_settings'] != '') {
      Assistant['setSettings'](_0xa6b2x1e['assistant_settings'])
    };
    if (!_0xa6b2x1e['player_email']) {
      Autobot['verifyEmail']()
    };
    if (Autobot['trial_time'] - Timestamp['now']() >= 0 || Autobot['premium_time'] - Timestamp['now']() >= 0) {
      if (typeof Autofarm == 'undefined' && typeof Autoculture == 'undefined' && typeof Autobuild == 'undefined' && typeof Autoattack == 'undefined') {
        $['when']($['ajax']({
          method: 'POST',
          data: Autobot['Account'],
          url: Autobot['scriptDomain'] + 'Autofarm.js',
          dataType: 'script'
        }), $['ajax']({
          method: 'POST',
          data: Autobot['Account'],
          url: Autobot['scriptDomain'] + 'Autoculture.js',
          dataType: 'script'
        }), $['ajax']({
          method: 'POST',
          data: Autobot['Account'],
          url: Autobot['scriptDomain'] + 'Autobuild.js',
          dataType: 'script'
        }), $['ajax']({
          method: 'POST',
          data: Autobot['Account'],
          url: Autobot['scriptDomain'] + 'Autoattack.js',
          dataType: 'script'
        }), $.Deferred(function(_0xa6b2x1f) {
          $(_0xa6b2x1f['resolve'])
        }))['done'](function() {
          ModuleManager['init']();
          Autofarm['init']();
          Autofarm['setSettings'](_0xa6b2x1e['autofarm_settings']);
          Autoculture['init']();
          Autoculture['setSettings'](_0xa6b2x1e['autoculture_settings']);
          Autobuild['init']();
          Autobuild['setSettings'](_0xa6b2x1e['autobuild_settings']);
          Autobuild['setQueue'](_0xa6b2x1e['building_queue'], _0xa6b2x1e['units_queue'], _0xa6b2x1e['ships_queue']);
          Autoattack['init']();
          ModuleManager['checkAutostart']()
        })
      }
    } else {
      if (typeof Autofarm == 'undefined') {
        $['when']($['ajax']({
          method: 'POST',
          data: Autobot['Account'],
          url: Autobot['scriptDomain'] + 'Autofarm.js',
          dataType: 'script'
        }), $.Deferred(function(_0xa6b2x1f) {
          $(_0xa6b2x1f['resolve'])
        }))['done'](function() {
          ModuleManager['init']();
          Autofarm['init']()
        })
      };
      $('#Autoculture_onoff')['mousePopup'](new MousePopup(ModuleManager['requiredPrem']));
      $('#Autobuild_onoff')['mousePopup'](new MousePopup(ModuleManager['requiredPrem']));
      $('#Autoattack_onoff')['mousePopup'](new MousePopup(ModuleManager['requiredPrem']));
      Autobot['createNotification']('getPremiumNotification', 'Unfortunately your premium membership is over. Please upgrade now!')
    }
  },
  requiredPrem: DM['getl10n']('tooltips')['requirements']['replace']('.', '') + ' premium'
}
