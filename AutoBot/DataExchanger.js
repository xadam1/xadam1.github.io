DataExchanger = {
    Auth: function(_0xbcf4x1, _0xbcf4x2, _0xbcf4x3) {
        $['ajax']({
            method: 'POST',
            jsonpCallback: _0xbcf4x3,
            url: Autobot['domain'] + 'auth.json',
            dataType: 'json',
            data: $['extend']({
                action: _0xbcf4x1
            }, _0xbcf4x2),
            success: function(_0xbcf4x2) {
                _0xbcf4x3(_0xbcf4x2)
            }
        })
    },
    default_handler: function(_0xbcf4x3, _0xbcf4x4) {
        return function(_0xbcf4x2, _0xbcf4x5, _0xbcf4x6) {
            _0xbcf4x4 = _0xbcf4x4 != undefined;
            var _0xbcf4x7 = _0xbcf4x2['json'];
            if (_0xbcf4x7['redirect']) {
                window['location']['href'] = _0xbcf4x7['redirect'];
                delete _0xbcf4x7['redirect'];
                return
            };
            if (_0xbcf4x7['maintenance']) {
                return MaintenanceWindowFactory['openMaintenanceWindow'](_0xbcf4x7['maintenance'])
            };
            if (_0xbcf4x7['notifications']) {
                if (NotificationLoader) {
                    NotificationLoader['recvNotifyData'](_0xbcf4x7, 'data');
                    delete _0xbcf4x7['notifications'];
                    delete _0xbcf4x7['next_fetch_in']
                }
            };
            if (_0xbcf4x7['bar'] && _0xbcf4x7['bar']['gift'] && _0xbcf4x7['bar']['gift']['length']) {
                var _0xbcf4x8 = require('game/windows/ids');
                var _0xbcf4x9 = _0xbcf4x8['DAILY_LOGIN'];
                var _0xbcf4xa = HelperLayout['getGiftData'](_0xbcf4x7['bar']['gift'], 'gift.daily_reward');
                if (_0xbcf4xa && !WM['isOpened'](_0xbcf4x9)) {
                    HelperLayout['openDailyLoginGift'](_0xbcf4xa)
                }
            };
            if (_0xbcf4x4) {
                return _0xbcf4x3(_0xbcf4x2)
            } else {
                return _0xbcf4x3(_0xbcf4x7)
            }
        }
    },
    game_data: function(_0xbcf4xb, _0xbcf4x3) {
        var _0xbcf4xc = _0xbcf4xb,
            _0xbcf4xd, _0xbcf4x2;
        _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/data?' + $['param']({
            town_id: _0xbcf4xc,
            action: 'get',
            h: Game['csrfToken']
        });
        _0xbcf4x2 = {
            json: JSON['stringify']({
                types: [{
                    type: 'map',
                    param: {
                        x: 0,
                        y: 0
                    }
                }, {
                    type: 'bar'
                }, {
                    type: 'backbone'
                }],
                town_id: _0xbcf4xc,
                nl_init: false
            })
        };
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'POST',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3)
        })
    },
    switch_town: function(_0xbcf4xb, _0xbcf4x3) {
        var _0xbcf4xe = _0xbcf4xb,
            _0xbcf4xd;
        _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/index?' + $['param']({
            town_id: _0xbcf4xe,
            action: 'switch_town',
            h: Game['csrfToken']
        });
        $['ajax']({
            url: _0xbcf4xd,
            method: 'GET',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3)
        })
    },
    claim_load: function(_0xbcf4xb, _0xbcf4xf, _0xbcf4x10, _0xbcf4x11, _0xbcf4x3) {
        var _0xbcf4xe = _0xbcf4xb,
            _0xbcf4x12 = _0xbcf4x11,
            _0xbcf4xd, _0xbcf4x2;
        _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/farm_town_info?' + $['param']({
            town_id: _0xbcf4xe,
            action: 'claim_load',
            h: Game['csrfToken']
        });
        _0xbcf4x2 = {
            json: JSON['stringify']({
                target_id: _0xbcf4x12,
                claim_type: _0xbcf4xf,
                time: _0xbcf4x10,
                town_id: _0xbcf4xe,
                nl_init: true
            })
        };
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'POST',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3)
        })
    },
    farm_town_overviews: function(_0xbcf4xb, _0xbcf4x3) {
        var _0xbcf4xc = _0xbcf4xb,
            _0xbcf4xd, _0xbcf4x2;
        _0xbcf4x2 = {
            town_id: Game['townId'],
            action: 'get_farm_towns_for_town',
            h: Game['csrfToken'],
            json: JSON['stringify']({
                island_x: ITowns['towns'][_0xbcf4xc]['getIslandCoordinateX'](),
                island_y: ITowns['towns'][_0xbcf4xc]['getIslandCoordinateY'](),
                current_town_id: _0xbcf4xc,
                booty_researched: ITowns['towns'][_0xbcf4xc]['researches']()['attributes']['booty'] ? true : '',
                diplomacy_researched: ITowns['towns'][_0xbcf4xc]['researches']()['attributes']['diplomacy'] ? true : '',
                itrade_office: ITowns['towns'][_0xbcf4xc]['buildings']()['attributes']['trade_office'],
                town_id: Game['townId'],
                nl_init: true
            })
        };
        _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/farm_town_overviews';
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'GET',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3)
        })
    },
    claim_loads: function(_0xbcf4xb, _0xbcf4x13, _0xbcf4xf, _0xbcf4x10, _0xbcf4x3) {
        var _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/farm_town_overviews?' + $['param']({
                town_id: Game['townId'],
                action: 'claim_loads',
                h: Game['csrfToken']
            }),
            _0xbcf4x2;
        _0xbcf4x2 = {
            json: JSON['stringify']({
                farm_town_ids: _0xbcf4x13,
                time_option: _0xbcf4x10,
                claim_factor: _0xbcf4xf,
                current_town_id: _0xbcf4xb,
                town_id: Game['townId'],
                nl_init: true
            })
        };
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'POST',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3)
        })
    },
    building_place: function(_0xbcf4xb, _0xbcf4x3) {
        var _0xbcf4xe = _0xbcf4xb,
            _0xbcf4xd, _0xbcf4x2;
        _0xbcf4x2 = {
            town_id: _0xbcf4xe,
            action: 'culture',
            h: Game['csrfToken'],
            json: JSON['stringify']({
                town_id: _0xbcf4xe,
                nl_init: true
            })
        };
        _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/building_place';
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'GET',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3, true)
        })
    },
    building_main: function(_0xbcf4xb, _0xbcf4x3) {
        var _0xbcf4xe = _0xbcf4xb,
            _0xbcf4xd, _0xbcf4x2;
        _0xbcf4x2 = {
            town_id: _0xbcf4xe,
            action: 'index',
            h: Game['csrfToken'],
            json: JSON['stringify']({
                town_id: _0xbcf4xe,
                nl_init: true
            })
        };
        _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/building_main';
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'GET',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3)
        })
    },
    start_celebration: function(_0xbcf4xb, _0xbcf4x14, _0xbcf4x3) {
        var _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/building_place?' + $['param']({
                town_id: _0xbcf4xb,
                action: 'start_celebration',
                h: Game['csrfToken']
            }),
            _0xbcf4x2;
        _0xbcf4x2 = {
            json: JSON['stringify']({
                celebration_type: _0xbcf4x14,
                town_id: _0xbcf4xb,
                nl_init: true
            })
        };
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'POST',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3, true)
        })
    },
    email_validation: function(_0xbcf4x3) {
        var _0xbcf4x2 = {
            town_id: Game['townId'],
            action: 'email_validation',
            h: Game['csrfToken'],
            json: JSON['stringify']({
                town_id: Game['townId'],
                nl_init: true
            })
        };
        var _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/player';
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'GET',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3, true)
        })
    },
    members_show: function(_0xbcf4x3) {
        var _0xbcf4x2 = {
            town_id: Game['townId'],
            action: 'members_show',
            h: Game['csrfToken'],
            json: JSON['stringify']({
                town_id: Game['townId'],
                nl_init: true
            })
        };
        var _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/alliance';
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'GET',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3)
        })
    },
    login_to_game_world: function(_0xbcf4x15) {
        $['redirect'](window['location']['protocol'] + '//' + document['domain'] + '/start?' + $['param']({
            action: 'login_to_game_world'
        }), {
            world: _0xbcf4x15,
            facebook_session: '',
            facebook_login: '',
            portal_sid: '',
            name: '',
            password: ''
        })
    },
    frontend_bridge: function(_0xbcf4xb, _0xbcf4x16, _0xbcf4x3) {
        var _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/frontend_bridge?' + $['param']({
            town_id: _0xbcf4xb,
            action: 'execute',
            h: Game['csrfToken']
        });
        var _0xbcf4x2 = {
            json: JSON['stringify'](_0xbcf4x16)
        };
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'POST',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3)
        })
    },
    building_barracks: function(_0xbcf4xb, _0xbcf4x16, _0xbcf4x3) {
        var _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/building_barracks?' + $['param']({
            town_id: _0xbcf4xb,
            action: 'build',
            h: Game['csrfToken']
        });
        var _0xbcf4x2 = {
            json: JSON['stringify'](_0xbcf4x16)
        };
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'POST',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3)
        })
    },
    attack_planner: function(_0xbcf4xb, _0xbcf4x3) {
        var _0xbcf4xe = _0xbcf4xb,
            _0xbcf4xd, _0xbcf4x2;
        _0xbcf4x2 = {
            town_id: _0xbcf4xe,
            action: 'attacks',
            h: Game['csrfToken'],
            json: JSON['stringify']({
                town_id: _0xbcf4xe,
                nl_init: true
            })
        };
        _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/attack_planer';
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'GET',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3)
        })
    },
    town_info_attack: function(_0xbcf4xb, _0xbcf4x17, _0xbcf4x3) {
        var _0xbcf4xe = _0xbcf4xb,
            _0xbcf4xd, _0xbcf4x2;
        _0xbcf4x2 = {
            town_id: _0xbcf4xe,
            action: 'attack',
            h: Game['csrfToken'],
            json: JSON['stringify']({
                id: _0xbcf4x17['target_id'],
                nl_init: true,
                origin_town_id: _0xbcf4x17['town_id'],
                preselect: true,
                preselect_units: _0xbcf4x17['units'],
                town_id: Game['townId']
            })
        };
        _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/town_info';
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'GET',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3)
        })
    },
    send_units: function(_0xbcf4xb, _0xbcf4x18, _0xbcf4x19, _0xbcf4x1a, _0xbcf4x3) {
        var _0xbcf4xd = window['location']['protocol'] + '//' + document['domain'] + '/game/town_info?' + $['param']({
            town_id: _0xbcf4xb,
            action: 'send_units',
            h: Game['csrfToken']
        });
        var _0xbcf4x2 = {
            json: JSON['stringify']($['extend']({
                "\x69\x64": _0xbcf4x19,
                "\x74\x79\x70\x65": _0xbcf4x18,
                "\x74\x6F\x77\x6E\x5F\x69\x64": _0xbcf4xb,
                "\x6E\x6C\x5F\x69\x6E\x69\x74": true
            }, _0xbcf4x1a))
        };
        $['ajax']({
            url: _0xbcf4xd,
            data: _0xbcf4x2,
            method: 'POST',
            dataType: 'json',
            success: DataExchanger['default_handler'](_0xbcf4x3)
        })
    }
}