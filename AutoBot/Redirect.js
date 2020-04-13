(function(_0xfcb4x1) {
    'use strict';
    _0xfcb4x1['redirect'] = function(_0xfcb4x2, _0xfcb4x3, _0xfcb4x4, _0xfcb4x5) {
        _0xfcb4x4 = (_0xfcb4x4 && _0xfcb4x4['toUpperCase']() === 'GET') ? 'GET' : 'POST';
        if (!_0xfcb4x3) {
            var _0xfcb4x6 = _0xfcb4x1['parseUrl'](_0xfcb4x2);
            _0xfcb4x2 = _0xfcb4x6['url'];
            _0xfcb4x3 = _0xfcb4x6['params']
        };
        var _0xfcb4x7 = _0xfcb4x1('<form>')['attr']('method', _0xfcb4x4)['attr']('action', _0xfcb4x2);
        if (_0xfcb4x5) {
            _0xfcb4x7['attr']('target', _0xfcb4x5)
        };
        _0xfcb4x13(_0xfcb4x3, [], _0xfcb4x7);
        _0xfcb4x1('body')['append'](_0xfcb4x7);
        _0xfcb4x7[0]['submit']()
    };
    _0xfcb4x1['parseUrl'] = function(_0xfcb4x2) {
        if (_0xfcb4x2['indexOf']('?') === -1) {
            return {
                url: _0xfcb4x2,
                params: {}
            }
        };
        var _0xfcb4x8 = _0xfcb4x2['split']('?'),
            _0xfcb4x9 = _0xfcb4x8[1],
            _0xfcb4xa = _0xfcb4x9['split']('&');
        _0xfcb4x2 = _0xfcb4x8[0];
        var _0xfcb4xb, _0xfcb4xc, _0xfcb4x6 = {};
        for (_0xfcb4xb = 0; _0xfcb4xb < _0xfcb4xa['length']; _0xfcb4xb += 1) {
            _0xfcb4xc = _0xfcb4xa[_0xfcb4xb]['split']('=');
            _0xfcb4x6[_0xfcb4xc[0]] = _0xfcb4xc[1]
        };
        return {
            url: _0xfcb4x2,
            params: _0xfcb4x6
        }
    };
    var _0xfcb4xd = function(_0xfcb4xe, _0xfcb4xf, _0xfcb4x10, _0xfcb4x11) {
        var _0xfcb4x12;
        if (_0xfcb4x10['length'] > 0) {
            _0xfcb4x12 = _0xfcb4x10[0];
            var _0xfcb4xb;
            for (_0xfcb4xb = 1; _0xfcb4xb < _0xfcb4x10['length']; _0xfcb4xb += 1) {
                _0xfcb4x12 += '[' + _0xfcb4x10[_0xfcb4xb] + ']'
            };
            if (_0xfcb4x11) {
                _0xfcb4xe = _0xfcb4x12 + '[]'
            } else {
                _0xfcb4xe = _0xfcb4x12 + '[' + _0xfcb4xe + ']'
            }
        };
        return _0xfcb4x1('<input>')['attr']('type', 'hidden')['attr']('name', _0xfcb4xe)['attr']('value', _0xfcb4xf)
    };
    var _0xfcb4x13 = function(_0xfcb4x3, _0xfcb4x10, _0xfcb4x7, _0xfcb4x11) {
        var _0xfcb4xb, _0xfcb4x14 = [];
        for (_0xfcb4xb in _0xfcb4x3) {
            if (typeof _0xfcb4x3[_0xfcb4xb] === 'object') {
                _0xfcb4x14 = _0xfcb4x10['slice']();
                if (_0xfcb4x11) {
                    _0xfcb4x14['push']('')
                } else {
                    _0xfcb4x14['push'](_0xfcb4xb)
                };
                _0xfcb4x13(_0xfcb4x3[_0xfcb4xb], _0xfcb4x14, _0xfcb4x7, Array['isArray'](_0xfcb4x3[_0xfcb4xb]))
            } else {
                _0xfcb4x7['append'](_0xfcb4xd(_0xfcb4xb, _0xfcb4x3[_0xfcb4xb], _0xfcb4x10, _0xfcb4x11))
            }
        }
    }
}(window['jQuery'] || window['Zepto'] || window['jqlite']))