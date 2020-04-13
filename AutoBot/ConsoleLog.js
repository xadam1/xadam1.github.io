ConsoleLog = {
    Logs: [],
    Types: ['Autobot', 'Farming', 'Culture', 'Builder', 'Attack '],
    scrollInterval: '',
    scrollUpdate: true,
    contentConsole: function() {
        var _0x7a76x1 = $('<fieldset/>', {
            "\x73\x74\x79\x6C\x65": 'float:left; width:472px;'
        })['append']($('<legend/>')['html']('Autobot Console'))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'terminal'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'terminal-output'
        }))['scroll'](function() {
            ConsoleLog.LogScrollBottom()
        }));
        var _0x7a76x2 = _0x7a76x1['find']('.terminal-output');
        $['each'](ConsoleLog.Logs, function(_0x7a76x3, _0x7a76x4) {
            _0x7a76x2['append'](_0x7a76x4)
        });
        return _0x7a76x1
    },
    Log: function(_0x7a76x5, _0x7a76x6) {
        if (this['Logs']['length'] >= 500) {
            this['Logs']['shift']()
        };

        function _0x7a76x7(_0x7a76x8) {
            return (_0x7a76x8 < 10) ? '0' + _0x7a76x8 : _0x7a76x8
        }
        var _0x7a76x9 = new Date();
        var _0x7a76xa = _0x7a76x7(_0x7a76x9['getHours']()) + ':' + _0x7a76x7(_0x7a76x9['getMinutes']()) + ':' + _0x7a76x7(_0x7a76x9['getSeconds']());
        var _0x7a76xb = $('<div/>')['append']($('<div/>', {
            "\x73\x74\x79\x6C\x65": 'width: 100%;'
        })['html'](_0x7a76xa + ' - ' + '[' + ConsoleLog['Types'][_0x7a76x6] + ']: ' + _0x7a76x5));
        this['Logs']['push'](_0x7a76xb);
        var _0x7a76x2 = $('.terminal-output');
        if (_0x7a76x2['length']) {
            _0x7a76x2['append'](_0x7a76xb);
            if (this['scrollUpdate']) {
                var _0x7a76xc = $('.terminal');
                var _0x7a76xd = $('.terminal-output')[0]['scrollHeight'];
                _0x7a76xc['scrollTop'](_0x7a76xd)
            }
        }
    },
    LogScrollBottom: function() {
        clearInterval(this['scrollInterval']);
        var _0x7a76xc = $('.terminal');
        var _0x7a76x2 = $('.terminal-output');
        if (_0x7a76xc['scrollTop']() + _0x7a76xc['height']() == _0x7a76x2['height']()) {
            this['scrollUpdate'] = true
        } else {
            this['scrollUpdate'] = false
        };
        var _0x7a76xd = _0x7a76x2[0]['scrollHeight'];
        this['scrollInterval'] = setInterval(function() {
            _0x7a76xc['scrollTop'](_0x7a76xd)
        }, 7000)
    }
}