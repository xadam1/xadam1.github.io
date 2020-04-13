Assistant = {
    settings: {
        town_names: false,
        player_name: false,
        alliance_name: true,
        auto_relogin: 0
    },
    init: function() {
        ConsoleLog.Log('Initialize Assistant', 0)
    },
    setSettings: function(_0x8bc3x1) {
        if (_0x8bc3x1 != '' && _0x8bc3x1 != null) {
            $['extend'](Assistant['settings'], JSON['parse'](_0x8bc3x1))
        };
        Assistant['initSettings']()
    },
    initSettings: function() {
        if (Assistant['settings']['town_names']) {
            $('#map_towns .flag')['addClass']('active_town')
        } else {
            $('#map_towns .flag')['removeClass']('active_town')
        };
        if (Assistant['settings']['player_name']) {
            $('#map_towns .flag')['addClass']('active_player')
        } else {
            $('#map_towns .flag')['removeClass']('active_player')
        };
        if (Assistant['settings']['alliance_name']) {
            $('#map_towns .flag')['addClass']('active_alliance')
        } else {
            $('#map_towns .flag')['removeClass']('active_alliance')
        }
    },
    contentSettings: function() {
        return $('<fieldset/>', {
            "\x69\x64": 'Assistant_settings',
            "\x73\x74\x79\x6C\x65": 'float:left; width:472px;height: 270px;'
        })['append']($('<legend/>')['html']('Assistant Settings'))['append'](FormBuilder['checkbox']({
            "\x74\x65\x78\x74": 'Show town names on island view.',
            "\x69\x64": 'assistant_town_names',
            "\x6E\x61\x6D\x65": 'assistant_town_names',
            "\x63\x68\x65\x63\x6B\x65\x64": Assistant['settings']['town_names']
        }))['append'](FormBuilder['checkbox']({
            "\x74\x65\x78\x74": 'Show player names on island view.',
            "\x69\x64": 'assistant_player_names',
            "\x6E\x61\x6D\x65": 'assistant_player_names',
            "\x63\x68\x65\x63\x6B\x65\x64": Assistant['settings']['player_name']
        }))['append'](FormBuilder['checkbox']({
            "\x74\x65\x78\x74": 'Show alliance names on island view.',
            "\x69\x64": 'assistant_alliance_names',
            "\x6E\x61\x6D\x65": 'assistant_alliance_names',
            "\x63\x68\x65\x63\x6B\x65\x64": Assistant['settings']['alliance_name']
        }))['append'](FormBuilder['selectBox']({
            id: 'assistant_auto_relogin',
            name: 'assistant_auto_relogin',
            label: 'Auto re-login: ',
            styles: 'width: 120px;',
            value: Assistant['settings']['auto_relogin'],
            options: [{
                value: '0',
                name: 'Disabled'
            }, {
                value: '120',
                name: 'After 2 minutes'
            }, {
                value: '300',
                name: 'After 5 minutes'
            }, {
                value: '600',
                name: 'After 10 minutes'
            }, {
                value: '900',
                name: 'After 15 minutes'
            }]
        }))['append'](FormBuilder['button']({
            name: DM['getl10n']('notes')['btn_save'],
            style: 'top: 120px;'
        })['on']('click', function() {
            var _0x8bc3x2 = $('#Assistant_settings')['serializeObject']();
            Assistant['settings']['town_names'] = _0x8bc3x2['assistant_town_names'] != undefined;
            Assistant['settings']['player_name'] = _0x8bc3x2['assistant_player_names'] != undefined;
            Assistant['settings']['alliance_name'] = _0x8bc3x2['assistant_alliance_names'] != undefined;
            Assistant['settings']['auto_relogin'] = parseInt(_0x8bc3x2['assistant_auto_relogin']);
            DataExchanger.Auth('saveAssistant', {
                player_id: Autobot['Account']['player_id'],
                world_id: Autobot['Account']['world_id'],
                csrfToken: Autobot['Account']['csrfToken'],
                assistant_settings: Autobot['stringify'](Assistant['settings'])
            }, Assistant['callbackSave'])
        }))
    },
    callbackSave: function() {
        HumanMessage['success']('The settings were saved!');
        Assistant['initSettings']()
    }
}