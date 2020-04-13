FormBuilder = {
    button: function(_0x67ffx1) {
        return $('<div/>')['append']($('<a/>', {
            "\x63\x6C\x61\x73\x73": 'button_new' + (_0x67ffx1['class'] || ''),
            "\x68\x72\x65\x66": '#',
            "\x73\x74\x79\x6C\x65": 'margin-top:1px;float:left;' + (_0x67ffx1['style'] || '')
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'left'
        }))['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'right'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'caption js-caption'
        })['text'](_0x67ffx1['name'])))
    },
    checkbox: function(_0x67ffx1, _0x67ffx2, _0x67ffx3) {
        return $('<div/>', {
            "\x63\x6C\x61\x73\x73": 'checkbox_new' + ((_0x67ffx1['checked']) ? ' checked' : '') + ((_0x67ffx1['disabled']) ? ' disabled' : ''),
            "\x73\x74\x79\x6C\x65": 'padding: 5px;' + (_0x67ffx1['style'] || '')
        })['append']($('<input/>', {
            "\x74\x79\x70\x65": 'checkbox',
            "\x6E\x61\x6D\x65": _0x67ffx1['name'],
            "\x69\x64": _0x67ffx1['id'],
            "\x63\x68\x65\x63\x6B\x65\x64": _0x67ffx1['checked'],
            "\x73\x74\x79\x6C\x65": 'display: none;'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'cbx_icon',
            "\x72\x65\x6C": _0x67ffx1['name']
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'cbx_caption'
        })['text'](_0x67ffx1['text']))['bind']('click', function() {
            $(this)['toggleClass']('checked');
            $(this)['find']($('input[type="checkbox"]'))['prop']('checked', $(this)['hasClass']('checked'));
            if ($(this)['hasClass']('checked')) {
                if (_0x67ffx2 != undefined) {
                    _0x67ffx2()
                }
            } else {
                if (_0x67ffx3 != undefined) {
                    _0x67ffx3()
                }
            }
        })
    },
    input: function(_0x67ffx1) {
        return $('<div/>', {
            "\x73\x74\x79\x6C\x65": 'padding: 5px;'
        })['append']($('<label/>', {
            "\x66\x6F\x72": _0x67ffx1['id']
        })['text'](_0x67ffx1['name'] + ': '))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'textbox',
            "\x73\x74\x79\x6C\x65": _0x67ffx1['style']
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'left'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'right'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'middle'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'ie7fix'
        })['append']($('<input/>', {
            "\x74\x79\x70\x65": _0x67ffx1['type'],
            "\x74\x61\x62\x69\x6E\x64\x65\x78": '1',
            "\x69\x64": _0x67ffx1['id'],
            "\x6E\x61\x6D\x65": _0x67ffx1['id'],
            "\x76\x61\x6C\x75\x65": _0x67ffx1['value']
        })['attr']('size', _0x67ffx1['size'])))))
    },
    textarea: function(_0x67ffx1) {
        return $('<div/>', {
            "\x73\x74\x79\x6C\x65": 'padding: 5px;'
        })['append']($('<label/>', {
            "\x66\x6F\x72": _0x67ffx1['id']
        })['text'](_0x67ffx1['name'] + ': '))['append']($('<div/>')['append']($('<textarea/>', {
            "\x6E\x61\x6D\x65": _0x67ffx1['id'],
            "\x69\x64": _0x67ffx1['id']
        })))
    },
    inputMinMax: function(_0x67ffx1) {
        return $('<div/>', {
            "\x63\x6C\x61\x73\x73": 'textbox'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'grcrt_spinner_btn grcrt_spinner_down',
            "\x72\x65\x6C": _0x67ffx1['name']
        })['click'](function() {
            var _0x67ffx4 = $(this)['parent']()['find']('#' + $(this)['attr']('rel'));
            if (parseInt($(_0x67ffx4)['attr']('min')) < parseInt($(_0x67ffx4)['attr']('value'))) {
                $(_0x67ffx4)['attr']('value', parseInt($(_0x67ffx4)['attr']('value')) - 1)
            }
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'textbox',
            "\x73\x74\x79\x6C\x65": _0x67ffx1['style']
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'left'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'right'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'middle'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'ie7fix'
        })['append']($('<input/>', {
            "\x74\x79\x70\x65": 'text',
            "\x74\x61\x62\x69\x6E\x64\x65\x78": '1',
            "\x69\x64": _0x67ffx1['name'],
            "\x76\x61\x6C\x75\x65": _0x67ffx1['value'],
            "\x6D\x69\x6E": _0x67ffx1['min'],
            "\x6D\x61\x78": _0x67ffx1['max']
        })['attr']('size', _0x67ffx1['size'] || 10)['css']('text-align', 'right')))))['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'grcrt_spinner_btn grcrt_spinner_up',
            "\x72\x65\x6C": _0x67ffx1['name']
        })['click'](function() {
            var _0x67ffx4 = $(this)['parent']()['find']('#' + $(this)['attr']('rel'));
            if (parseInt($(_0x67ffx4)['attr']('max')) > parseInt($(_0x67ffx4)['attr']('value'))) {
                $(_0x67ffx4)['attr']('value', parseInt($(_0x67ffx4)['attr']('value')) + 1)
            }
        }))
    },
    inputSlider: function(_0x67ffx1) {
        return $('<div/>', {
            "\x69\x64": 'grcrt_' + _0x67ffx1['name'] + '_config'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'slider_container'
        })['append']($('<div/>', {
            "\x73\x74\x79\x6C\x65": 'float:left;width:120px;'
        })['html'](_0x67ffx1['name']))['append'](FormBuilder['input']({
            "\x6E\x61\x6D\x65": 'grcrt_' + _0x67ffx1['name'] + '_value',
            "\x73\x74\x79\x6C\x65": 'float:left;width:33px;'
        })['hide']())['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'windowmgr_slider',
            "\x73\x74\x79\x6C\x65": 'width: 200px;float: left;'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'grepo_slider sound_volume'
        }))))['append']($('<script/>', {
            "\x74\x79\x70\x65": 'text/javascript'
        })['text']('' + 'RepConv.slider = $(\'#grcrt_' + _0x67ffx1['name'] + '_config .sound_volume\').grepoSlider({\x0A' + 'min: 0,\x0A' + 'max: 100,\x0A' + 'step: 5,\x0A' + 'value: ' + _0x67ffx1['volume'] + ',\x0A' + 'template: \'tpl_grcrt_slider\'\x0A' + '}).on(\'sl:change:value\', function (e, _sl, value) {\x0A' + '$(\'#grcrt_' + _0x67ffx1['name'] + '_value\').attr(\'value\',value);\x0A' + 'if (RepConv.audio.test != undefined){\x0A' + 'RepConv.audio.test.volume = value/100;\x0A' + '}\x0A' + '}),\x0A' + '$(\'#grcrt_' + _0x67ffx1['name'] + '_config .button_down\').css(\'background-position\',\'-144px 0px;\'),\x0A' + '$(\'#grcrt_' + _0x67ffx1['name'] + '_config .button_up\').css(\'background-position\',\'-126px 0px;\')\x0A' + ''))
    },
    selectBox: function(_0x67ffx1) {
        return $('<div/>', {
            "\x73\x74\x79\x6C\x65": 'padding: 5px'
        })['append']($('<input/>', {
            "\x74\x79\x70\x65": 'hidden',
            "\x6E\x61\x6D\x65": _0x67ffx1['name'],
            "\x69\x64": _0x67ffx1['id'],
            "\x76\x61\x6C\x75\x65": _0x67ffx1['value']
        }))['append']($('<label/>', {
            "\x66\x6F\x72": _0x67ffx1['id']
        })['text'](_0x67ffx1['label']))['append']($('<div/>', {
            "\x69\x64": _0x67ffx1['id'],
            "\x63\x6C\x61\x73\x73": 'dropdown default',
            "\x73\x74\x79\x6C\x65": _0x67ffx1['styles']
        })['dropdown']({
            list_pos: 'left',
            value: _0x67ffx1['value'],
            disabled: (_0x67ffx1['disabled'] || false),
            options: _0x67ffx1['options']
        })['on']('dd:change:value', function(_0x67ffx4, _0x67ffx5) {
            $('#' + _0x67ffx1['id'])['attr']('value', _0x67ffx5)
        }))
    },
    timerBoxFull: function(_0x67ffx1) {
        return $('<div/>', {
            "\x63\x6C\x61\x73\x73": 'single-progressbar instant_buy js-progressbar type_building_queue',
            "\x69\x64": _0x67ffx1['id'],
            "\x73\x74\x79\x6C\x65": _0x67ffx1['styles']
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'border_l'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'border_r'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'body'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'progress'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'indicator',
            "\x73\x74\x79\x6C\x65": 'width: 0%;'
        })))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'caption'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'text'
        }))['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'value_container'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'curr'
        })['html']('0%'))))
    },
    timerBoxSmall: function(_0x67ffx1) {
        return $('<div/>', {
            "\x63\x6C\x61\x73\x73": 'single-progressbar instant_buy js-progressbar type_building_queue',
            "\x69\x64": _0x67ffx1['id'],
            "\x73\x74\x79\x6C\x65": _0x67ffx1['styles']
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'progress'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'indicator',
            "\x73\x74\x79\x6C\x65": 'width: 0%;'
        })))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'caption'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'text'
        }))['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'value_container'
        })['append']($('<span/>', {
            "\x63\x6C\x61\x73\x73": 'curr'
        })['html'](_0x67ffx1['text'] ? _0x67ffx1['text'] : '-'))))
    },
    gameWrapper: function(_0x67ffx6, _0x67ffx7, _0x67ffx8, _0x67ffx1) {
        return $('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_inner_box',
            "\x73\x74\x79\x6C\x65": _0x67ffx1,
            "\x69\x64": _0x67ffx7
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border'
        })['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_top'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_bottom'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_left'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_right'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_top'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_corner corner1'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_corner corner2'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_corner corner3'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_border_corner corner4'
        }))['append']($('<div/>', {
            "\x63\x6C\x61\x73\x73": 'game_header bold',
            "\x69\x64": 'settings_header'
        })['html'](_0x67ffx6))['append']($('<div/>')['append'](_0x67ffx8)))
    }
}