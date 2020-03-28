var Autobot = {
    title: "Autobot",
    version: "3.1",
    domain: window["location"]["protocol"] + "//bot.grepobot.com/",
    botWnd: "",
    botPremWnd: "",
    botEmailWnd: "",
    facebookWnd: "",
    isLogged: false,
    Account: {
        player_id: Game["player_id"],
        player_name: Game["player_name"],
        world_id: Game["world_id"],
        locale_lang: Game["locale_lang"],
        premium_grepolis: Game["premium_user"],
        csrfToken: Game["csrfToken"]
    },
    trial_time: 0,
    premium_time: 9999999,
    facebook_like: 0,
    toolbox_element: null,
    init: function() {
        ConsoleLog.Log("Initialize Autobot", 0);
        Autobot["authenticate"]();
        Autobot["obServer"]();
        Autobot["isActive"]();
        Autobot["setToolbox"]();
        Autobot["initAjax"]();
        Autobot["initMapTownFeature"]();
        Autobot["fixMessage"]();
        Assistant["init"]()
    },
    setToolbox: function() {
        Autobot["toolbox_element"] = $(".nui_bot_toolbox")
    },
    authenticate: function() {
        DataExchanger.Auth("login", Autobot.Account, ModuleManager["callbackAuth"])
    },
    obServer: function() {
        $.Observer(GameEvents["notification"]["push"])["subscribe"]("GRCRTNotification", function() {
            $("#notification_area>.notification.getPremiumNotification")["on"]("click", function() {
                Autobot["getPremium"]()
            })
        })
    },
    initWnd: function() {
        if (Autobot["isLogged"]) {
            if (typeof Autobot["botWnd"] != "undefined") {
                try {
                    Autobot["botWnd"]["close"]()
                } catch (F) {};
                Autobot["botWnd"] = undefined
            };
            if (typeof Autobot["botPremWnd"] != "undefined") {
                try {
                    Autobot["botPremWnd"]["close"]()
                } catch (F) {};
                Autobot["botPremWnd"] = undefined
            };
            Autobot["botWnd"] = Layout["dialogWindow"]["open"]("", Autobot["title"] + " v<span style=\"font-size: 10px;\">" + Autobot["version"] + "</span>", 500, 350, "", false);
            Autobot["botWnd"]["setHeight"]([350]);
            Autobot["botWnd"]["setPosition"](["center", "center"]);
            var variable_0 = Autobot["botWnd"]["getJQElement"]();
            variable_0["append"]($("<div/>", {
                "\x63\x6C\x61\x73\x73": "menu_wrapper",
                "\x73\x74\x79\x6C\x65": "left: 78px; right: 14px"
            })["append"]($("<ul/>", {
                "\x63\x6C\x61\x73\x73": "menu_inner"
            })["prepend"](Autobot["addMenuItem"]("AUTHORIZE", "Account", "Account"))["prepend"](Autobot["addMenuItem"]("CONSOLE", "Assistant", "Assistant"))["prepend"](Autobot["addMenuItem"]("ASSISTANT", "Console", "Console"))["prepend"](Autobot["addMenuItem"]("SUPPORT", "Support", "Support"))));
            if (typeof Autoattack !== "undefined") {
                variable_0["find"](".menu_inner li:last-child")["before"](Autobot["addMenuItem"]("ATTACKMODULE", "Attack", "Autoattack"))
            };
            if (typeof Autobuild !== "undefined") {
                variable_0["find"](".menu_inner li:last-child")["before"](Autobot["addMenuItem"]("CONSTRUCTMODULE", "Build", "Autobuild"))
            };
            if (typeof Autoculture !== "undefined") {
                variable_0["find"](".menu_inner li:last-child")["before"](Autobot["addMenuItem"]("CULTUREMODULE", "Culture", "Autoculture"))
            };
            if (typeof Autofarm !== "undefined") {
                variable_0["find"](".menu_inner li:last-child")["before"](Autobot["addMenuItem"]("FARMMODULE", "Farm", "Autofarm"))
            };
            $("#Autobot-AUTHORIZE")["click"]()
        }
    },
    addMenuItem: function(variable_1, variable_2, variable_3) {
        return $("<li/>")["append"]($("<a/>", {
            "\x63\x6C\x61\x73\x73": "submenu_link",
            "\x68\x72\x65\x66": "#",
            "\x69\x64": "Autobot-" + variable_1,
            "\x72\x65\x6C": variable_3
        })["click"](function() {
            Autobot["botWnd"]["getJQElement"]()["find"]("li a.submenu_link")["removeClass"]("active");
            $(this)["addClass"]("active");
            Autobot["botWnd"]["setContent2"](Autobot["getContent"]($(this)["attr"]("rel")));
            if ($(this)["attr"]("rel") == "Console") {
                var variable_4 = $(".terminal");
                var variable_5 = $(".terminal-output")[0]["scrollHeight"];
                variable_4["scrollTop"](variable_5)
            }
        })["append"](function() {
            return variable_3 != "Support" ? $("<span/>", {
                "\x63\x6C\x61\x73\x73": "left"
            })["append"]($("<span/>", {
                "\x63\x6C\x61\x73\x73": "right"
            })["append"]($("<span/>", {
                "\x63\x6C\x61\x73\x73": "middle"
            })["html"](variable_2))) : "<a id=\"help-button\" onclick=\"return false;\" class=\"confirm\"></a>"
        }))
    },
    getContent: function(variable_6) {
        if (variable_6 == "Console") {
            return ConsoleLog["contentConsole"]()
        } else {
            if (variable_6 == "Account") {
                return Autobot["contentAccount"]()
            } else {
                if (variable_6 == "Support") {
                    return Autobot["contentSupport"]()
                } else {
                    if (typeof window[variable_6] != "undefined") {
                        return window[variable_6]["contentSettings"]()
                    };
                    return ""
                }
            }
        }
    },
    contentAccount: function() {
        var variable_7 = {
            "\x4E\x61\x6D\x65\x3A": Game["player_name"],
            "\x57\x6F\x72\x6C\x64\x3A": Game["world_id"],
            "\x52\x61\x6E\x6B\x3A": Game["player_rank"],
            "\x54\x6F\x77\x6E\x73\x3A": Game["player_villages"],
            "\x4C\x61\x6E\x67\x75\x61\x67\x65\x3A": Game["locale_lang"],
            "\x50\x72\x65\x6D\x69\x75\x6D\x3A\x20": (Autobot["premium_time"] - Timestamp["now"]()) >= 0 ? Autobot["secondsToTime"](Autobot["premium_time"] - Timestamp["now"]()) + "<span id=\"get_premium\" class=\"open_premium_icon\" onclick=\"Autobot.getPremium();\"></span>" : "No premium" + "<span id=\"get_premium\" class=\"open_premium_icon\" onclick=\"Autobot.getPremium();\"></span>",
            "\x54\x72\x69\x61\x6C\x3A": ((Autobot["trial_time"] - Timestamp["now"]()) >= 0 ? Autobot["secondsToTime"](Autobot["trial_time"] - Timestamp["now"]()) : "Trial is over") + (Autobot["facebook_like"] == 0 ? "<a href=\"#\" id=\"get_7days\" onclick=\"Autobot.botFacebookWnd();\">Get 3 free days!</a>" : "")
        };
        var variable_8 = $("<table/>", {
            "\x63\x6C\x61\x73\x73": "game_table layout_main_sprite",
            "\x63\x65\x6C\x6C\x73\x70\x61\x63\x69\x6E\x67": "0",
            "\x77\x69\x64\x74\x68": "100%"
        })["append"](function() {
            var variable_9 = 0;
            var variable_10 = $("<tbody/>");
            $["each"](variable_7, function(variable_11, variable_12) {
                variable_10["append"]($("<tr/>", {
                    "\x63\x6C\x61\x73\x73": variable_9 % 2 ? "game_table_even" : "game_table_odd"
                })["append"]($("<td/>", {
                    "\x73\x74\x79\x6C\x65": "background-color: #DFCCA6;width: 30%;"
                })["html"](variable_11))["append"]($("<td/>")["html"](variable_12)));
                variable_9++
            });
            return variable_10
        });
        var variable_13 = FormBuilder["gameWrapper"]("Account", "account_property_wrapper", variable_8, "margin-bottom:9px;")[0]["outerHTML"];
        variable_13 += $("<div/>", {
            "\x69\x64": "grepobanner",
            "\x73\x74\x79\x6C\x65": ""
        })[0]["outerHTML"];
        return variable_13
    },
    contentSupport: function() {
        return $("<fieldset/>", {
            "\x69\x64": "Support_tab",
            "\x73\x74\x79\x6C\x65": "float:left; width:472px;height: 270px;"
        })["append"]($("<legend/>")["html"]("Grepobot Support"))["append"]($("<div/>", {
            style: "float: left;"
        })["append"](FormBuilder["selectBox"]({
            id: "support_type",
            name: "support_type",
            label: "Type: ",
            styles: "width: 167px;margin-left: 18px;",
            value: "Bug report",
            options: [{
                value: "Bug report",
                name: "Bug report"
            }, {
                value: "Feature request",
                name: "Feature request"
            }, {
                value: "Financial",
                name: "Financial"
            }, {
                value: "Other",
                name: "Other"
            }]
        }))["append"](FormBuilder["input"]({
            id: "support_input_email",
            name: "Email",
            style: "margin-left: 12px;width: 166px;",
            value: "",
            type: "email"
        }))["append"](FormBuilder["input"]({
            id: "support_input_subject",
            name: "Subject",
            style: "margin-top: 0;width: 166px;",
            value: "",
            type: "text"
        }))["append"](FormBuilder["textarea"]({
            id: "support_textarea",
            name: "Message",
            value: ""
        }))["append"](FormBuilder["button"]({
            name: "Send",
            style: "margin-top: 0;"
        })["on"]("click", function() {
            var variable_140 = $("#Support_tab")["serializeObject"]();
            var variable_141 = false;
            if (typeof variable_140["support_input_email"] === "undefined" || variable_140["support_input_email"] == "") {
                variable_141 = "Please enter your email."
            } else {
                if (typeof variable_140["support_input_subject"] === "undefined" || variable_140["support_input_subject"] == "") {
                    variable_141 = "Please enter a subject."
                } else {
                    if (typeof variable_140["support_textarea"] === "undefined" || variable_140["support_textarea"] == "") {
                        variable_141 = "Please enter a message."
                    } else {
                        if (typeof variable_140["support_input_email"] !== "undefined" && !/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/ ["test"](variable_140["support_input_email"])) {
                            variable_141 = "Your email is not valid!"
                        }
                    }
                }
            };
            if (variable_141) {
                HumanMessage["error"](variable_141)
            } else {
                DataExchanger.Auth("supportEmail", $["extend"]({
                    csrfToken: Autobot["Account"]["csrfToken"],
                    player_name: Autobot["Account"]["player_name"],
                    player_id: Autobot["Account"]["player_id"],
                    world_id: Autobot["Account"]["world_id"]
                }, variable_140), function(variable_7) {
                    if (variable_7["success"]) {
                        if (typeof Autobot["botWnd"] != "undefined") {
                            try {
                                Autobot["botWnd"]["close"]()
                            } catch (F) {};
                            Autobot["botWnd"] = undefined
                        };
                        HumanMessage["success"]("Thank you, your email has been send!")
                    }
                })
            }
        })))["append"]($("<div/>", {
            style: "float: right; width: 215px;"
        })["append"]($("<a/>", {
            id: "Facebook_grepobot",
            target: "_blank",
            href: "https://www.facebook.com/BotForGrepolis/"
        })["html"]("<img src=\"https://bot.grepobot.com/images/facebook_page.png\" title=\"Facebook Grepobot\"/>")))
    },
    checkAlliance: function() {
        if (!$(".allianceforum.main_menu_item")["hasClass"]("disabled")) {
            DataExchanger["members_show"](function(variable_7) {
                if (variable_7["plain"]["html"] != undefined) {
                    jQuery["each"]($(variable_7["plain"]["html"])["find"]("#ally_members_body .ally_name a"), function() {
                        var variable_12 = atob($(this)["attr"]("href"));
                        console["log"](JSON["parse"](variable_12["substr"](0, variable_12["length"] - 3)))
                    })
                }
            })
        }
    },
    fixMessage: function() {
        var variable_142 = function(variable_143) {
            return function() {
                variable_143["apply"](this, arguments);
                $(window)["unbind"]("click")
            }
        };
        HumanMessage["_initialize"] = variable_142(HumanMessage._initialize)
    },
    getPremium: function() {
        if (Autobot["isLogged"]) {
            $.Observer(GameEvents["menu"]["click"])["publish"]({
                option_id: "premium"
            });
            if (typeof Autobot["botPremWnd"] != "undefined") {
                try {
                    Autobot["botPremWnd"]["close"]()
                } catch (F) {};
                Autobot["botPremWnd"] = undefined
            };
            if (typeof Autobot["botWnd"] != "undefined") {
                try {
                    Autobot["botWnd"]["close"]()
                } catch (F) {};
                Autobot["botWnd"] = undefined
            };
            Autobot["botPremWnd"] = Layout["dialogWindow"]["open"]("", "Autobot v" + Autobot["version"] + " - Premium", 500, 350, "", false);
            Autobot["botPremWnd"]["setHeight"]([350]);
            Autobot["botPremWnd"]["setPosition"](["center", "center"]);
            var variable_144 = $("<div/>", {
                id: "payment"
            })["append"]($("<div/>", {
                id: "left"
            })["append"]($("<ul/>", {
                id: "time_options"
            })["append"]($("<li/>", {
                class: "active"
            })["append"]($("<span/>", {
                class: "amount"
            })["html"]("1 Month"))["append"]($("<span/>", {
                class: "price"
            })["html"]("\u20AC 4,99")))["append"]($("<li/>")["append"]($("<span/>", {
                class: "amount"
            })["html"]("2 Month"))["append"]($("<span/>", {
                class: "price"
            })["html"]("\u20AC 9,99"))["append"]($("<div/>", {
                class: "referenceAmount"
            })["append"]($("<div/>", {
                class: "reference",
                style: "transform: rotate(17deg);"
            })["html"]("+12 Days "))))["append"]($("<li/>")["append"]($("<span/>", {
                class: "amount"
            })["html"]("4 Months"))["append"]($("<span/>", {
                class: "price"
            })["html"]("\u20AC 19,99"))["append"]($("<div/>", {
                class: "referenceAmount"
            })["append"]($("<div/>", {
                class: "reference",
                style: "transform: rotate(17deg);"
            })["html"]("+36 Days "))))["append"]($("<li/>")["append"]($("<span/>", {
                class: "amount"
            })["html"]("10 Months"))["append"]($("<span/>", {
                class: "price"
            })["html"]("\u20AC 49,99"))["append"]($("<div/>", {
                class: "referenceAmount"
            })["append"]($("<div/>", {
                class: "reference",
                style: "transform: rotate(17deg);"
            })["html"]("+120 Days "))))))["append"]($("<div/>", {
                id: "right"
            })["append"]($("<div/>", {
                id: "pothead"
            }))["append"]($("<div/>", {
                id: "information"
            })["append"]($("<span/>", {
                class: "text"
            })["html"]("1 month for only \u20AC4,99"))["append"]($("<span/>", {
                class: "button"
            })["html"]("Buy"))));
            Autobot["botPremWnd"]["setContent2"](variable_144);
            var variable_145 = 0;
            $("#time_options li")["on"]("click", function() {
                $("#time_options li")["removeClass"]("active");
                $(this)["addClass"]("active");
                variable_145 = $(this)["index"]();
                var variable_146 = $("#payment #information .text");
                if (variable_145 == 0) {
                    variable_146["html"]("1 month for only \u20AC4,99")
                } else {
                    if (variable_145 == 1) {
                        variable_146["html"]("2 month +12 days for only \u20AC9,99")
                    } else {
                        if (variable_145 == 2) {
                            variable_146["html"]("4 months +36 days for only \u20AC19,99")
                        } else {
                            if (variable_145 == 3) {
                                variable_146["html"]("10 months +120 days for only \u20AC49,99")
                            }
                        }
                    }
                }
            });
            $("#payment #information")["on"]("click", function() {
                var variable_147 = window["open"](Autobot["domain"] + "paypal/process.php?payment=" + variable_145 + "&player_id=" + Autobot["Account"]["player_id"], "grepolis_payment", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,height=650,width=800");
                var variable_148 = setInterval(function() {
                    if (!variable_147 || variable_147["closed"]) {
                        clearInterval(variable_148);
                        Autobot["authenticate"]()
                    }
                }, 500)
            })
        }
    },
    botFacebookWnd: function() {
        if (Autobot["isLogged"] && Autobot["facebook_like"] == 0) {
            if (typeof Autobot["facebookWnd"] != "undefined") {
                try {
                    Autobot["facebookWnd"]["close"]()
                } catch (F) {};
                Autobot["facebookWnd"] = undefined
            };
            Autobot["facebookWnd"] = Layout["dialogWindow"]["open"]("", "Autobot v" + Autobot["version"] + " - Get 3 days free!", 275, 125, "", false);
            Autobot["facebookWnd"]["setHeight"]([125]);
            Autobot["facebookWnd"]["setPosition"](["center", "center"]);
            var variable_144 = $("<div/>", {
                id: "facebook_wnd"
            })["append"]("<span class=\"like-share-text\">Like & share and get <b>3 days</b> free premium.</span><a href=\"#\" class=\"fb-share\"><span class=\"fb-text\">Share</spanclass></a><div class=\"fb_like\"><div class=\"fb-like\" data-href=\"https://www.facebook.com/BotForGrepolis/\" data-layout=\"button\" data-action=\"like\" data-show-faces=\"false\" data-share=\"false\"></div></div>");
            Autobot["facebookWnd"]["setContent2"](variable_144);
            $(".ui-dialog #facebook_wnd")["closest"](".gpwindow_content")["css"]({
                "\x6C\x65\x66\x74": "-9px",
                "\x72\x69\x67\x68\x74": "-9px",
                "\x74\x6F\x70": "35px"
            });
            var variable_149 = false;
            var variable_14a = false;
            var variable_14b = function() {
                if (variable_149 || variable_14a) {
                    Autobot["upgrade3Days"]()
                };
                if (variable_149 && variable_14a) {
                    $.Observer(GameEvents["window"]["quest"]["open"])["publish"]({
                        quest_type: "hermes"
                    });
                    HumanMessage["success"]("You have received 3 days premium! Thank you for sharing.");
                    if (typeof Autobot["facebookWnd"] != "undefined") {
                        try {
                            Autobot["facebookWnd"]["close"]()
                        } catch (F) {};
                        Autobot["facebookWnd"] = undefined
                    };
                    if (typeof Autobot["botWnd"] != "undefined") {
                        try {
                            Autobot["botWnd"]["close"]()
                        } catch (F) {};
                        Autobot["botWnd"] = undefined
                    }
                }
            };
            if (window["fbAsyncInit"] == undefined) {
                window["fbAsyncInit"] = function() {
                    FB["init"]({
                        appId: "1505555803075328",
                        xfbml: true,
                        version: "v2.4"
                    });
                    FB["Event"]["subscribe"]("edge.create", function(variable_14c) {
                        variable_14a = true;
                        variable_14b()
                    });
                    FB["Event"]["subscribe"]("edge.remove", function(variable_14c) {
                        variable_14a = false
                    })
                }
            };
            if ($("#facebook-jssdk")["length"] <= 0) {
                (function(variable_14d, variable_14e, variable_1) {
                    var variable_14f, variable_00 = variable_14d["getElementsByTagName"](variable_14e)[0];
                    if (variable_14d["getElementById"](variable_1)) {
                        return
                    };
                    variable_14f = variable_14d["createElement"](variable_14e);
                    variable_14f["id"] = variable_1;
                    variable_14f["src"] = "//connect.facebook.net/en_US/sdk.js";
                    variable_00["parentNode"]["insertBefore"](variable_14f, variable_00)
                }(document, "script", "facebook-jssdk"))
            } else {
                FB["XFBML"]["parse"]()
            };
            $("#facebook_wnd .fb-share")["on"]("click", function() {
                FB["ui"]({
                    method: "share",
                    href: "https://www.facebook.com/BotForGrepolis/"
                }, function(variable_14c) {
                    if (variable_14c && !variable_14c["error_code"]) {
                        variable_149 = true;
                        variable_14b()
                    }
                })
            })
        }
    },
    upgrade3Days: function() {
        DataExchanger.Auth("upgrade3Days", Autobot.Account, function(variable_7) {
            if (variable_7["success"]) {
                DataExchanger.Auth("login", Autobot.Account, ModuleManager["callbackAuth"])
            }
        })
    },
    initAjax: function() {
        $(document)["ajaxComplete"](function(variable_01, variable_02, variable_03) {
            if (variable_03["url"]["indexOf"](Autobot["domain"]) == -1 && variable_03["url"]["indexOf"]("/game/") != -1 && variable_02["readyState"] == 4 && variable_02["status"] == 200) {
                var variable_04 = variable_03["url"]["split"]("?");
                var variable_05 = variable_04[0]["substr"](6) + "/" + variable_04[1]["split"]("&")[1]["substr"](7);
                if (typeof Autobuild !== "undefined") {
                    Autobuild["calls"](variable_05)
                };
                if (typeof Autoattack !== "undefined") {
                    Autoattack["calls"](variable_05, variable_02["responseText"])
                }
            }
        })
    },
    verifyEmail: function() {
        if (Autobot["isLogged"]) {
            DataExchanger["email_validation"](function(variable_7) {
                if (variable_7["plain"]["html"] != undefined) {
                    DataExchanger.Auth("verifyEmail", {
                        key: btoa(Autobot["stringify"]({
                            player_id: Autobot["Account"]["player_id"],
                            player_email: $(variable_7["plain"]["html"])["find"]("#current_email_adress")["html"]()
                        }))
                    }, function(variable_7) {
                        if (variable_7["success"] != undefined) {
                            Autobot["arrowActivated"]()
                        }
                    })
                }
            })
        }
    },
    randomize: function(variable_06, variable_07) {
        return Math["floor"](Math["random"]() * (variable_07 - variable_06 + 1)) + variable_06
    },
    secondsToTime: function(variable_08) {
        var variable_09 = Math["floor"](variable_08 / 86400);
        var variable_0a = Math["floor"]((variable_08 % 86400) / 3600);
        var variable_0b = Math["floor"](((variable_08 % 86400) % 3600) / 60);
        return (variable_09 ? variable_09 + " days " : "") + (variable_0a ? variable_0a + " hours " : "") + (variable_0b ? variable_0b + " minutes " : "")
    },
    timeToSeconds: function(variable_0c) {
        var variable_0d = variable_0c["split"](":"),
            variable_14e = 0,
            variable_0e = 1;
        while (variable_0d["length"] > 0) {
            variable_14e += variable_0e * parseInt(variable_0d["pop"](), 10);
            variable_0e *= 60
        };
        return variable_14e
    },
    arrowActivated: function() {
        var variable_0f = $("<div/>", {
            "\x63\x6C\x61\x73\x73": "helpers helper_arrow group_quest d_w animate bounce",
            "\x64\x61\x74\x61\x2D\x64\x69\x72\x65\x63\x74\x69\x6F\x6E": "w",
            "\x73\x74\x79\x6C\x65": "top: 0; left: 360px; visibility: visible; display: none;"
        });
        Autobot["toolbox_element"]["append"](variable_0f);
        variable_0f["show"]()["animate"]({
            left: "138px"
        }, "slow")["delay"](10000)["fadeOut"]("normal");
        setTimeout(function() {
            Autobot["botFacebookWnd"]()
        }, 25000)
    },
    createNotification: function(variable_10, variable_11) {
        var variable_12 = (typeof Layout["notify"] == "undefined") ? new NotificationHandler() : Layout;
        variable_12["notify"]($("#notification_area>.notification")["length"] + 1, variable_10, "<span><b>" + "Autobot" + "</b></span>" + variable_11 + "<span class='small notification_date'>" + "Version " + Autobot["version"] + "</span>")
    },
    toHHMMSS: function(variable_13) {
        var variable_14 = ~~(variable_13 / 3600);
        var variable_15 = ~~((variable_13 % 3600) / 60);
        var variable_16 = variable_13 % 60;
        ret = "";
        if (variable_14 > 0) {
            ret += "" + variable_14 + ":" + (variable_15 < 10 ? "0" : "")
        };
        ret += "" + variable_15 + ":" + (variable_16 < 10 ? "0" : "");
        ret += "" + variable_16;
        return ret
    },
    stringify: function(variable_17) {
        var variable_18 = typeof variable_17;
        if (variable_18 === "string") {
            return "\"" + variable_17 + "\""
        };
        if (variable_18 === "boolean" || variable_18 === "number") {
            return variable_17
        };
        if (variable_18 === "function") {
            return variable_17.toString()
        };
        var variable_19 = [];
        for (var variable_1a in variable_17) {
            variable_19["push"]("\"" + variable_1a + "\":" + this["stringify"](variable_17[variable_1a]))
        };
        return "{" + variable_19["join"](",") + "}"
    },
    isActive: function() {
        setTimeout(function() {
            DataExchanger.Auth("isActive", Autobot.Account, Autobot["isActive"])
        }, 180000)
    },
    town_map_info: function(variable_1b, variable_1c) {
        if (variable_1b != undefined && variable_1b["length"] > 0 && variable_1c["player_name"]) {
            for (var variable_1d = 0; variable_1d < variable_1b["length"]; variable_1d++) {
                if (variable_1b[variable_1d]["className"] == "flag town") {
                    if (typeof Assistant !== "undefined") {
                        if (Assistant["settings"]["town_names"]) {
                            $(variable_1b[variable_1d])["addClass"]("active_town")
                        };
                        if (Assistant["settings"]["player_name"]) {
                            $(variable_1b[variable_1d])["addClass"]("active_player")
                        };
                        if (Assistant["settings"]["alliance_name"]) {
                            $(variable_1b[variable_1d])["addClass"]("active_alliance")
                        }
                    };
                    $(variable_1b[variable_1d])["append"]("<div class=\"player_name\">" + (variable_1c["player_name"] || "") + "</div>");
                    $(variable_1b[variable_1d])["append"]("<div class=\"town_name\">" + variable_1c["name"] + "</div>");
                    $(variable_1b[variable_1d])["append"]("<div class=\"alliance_name\">" + (variable_1c["alliance_name"] || "") + "</div>");
                    break
                }
            }
        };
        return variable_1b
    },
    checkPremium: function(variable_1e) {
        return $(".advisor_frame." + variable_1e + " div")["hasClass"](variable_1e + "_active")
    },
    initWindow: function() {
        $(".nui_main_menu")["css"]("top", "282px");
        $("<div/>", {
            class: "nui_bot_toolbox"
        })["append"]($("<div/>", {
            class: "bot_menu layout_main_sprite"
        })["append"]($("<ul/>")["append"]($("<li/>", {
            id: "Autofarm_onoff",
            class: "disabled"
        })["append"]($("<span/>", {
            class: "autofarm farm_town_status_0"
        })))["append"]($("<li/>", {
            id: "Autoculture_onoff",
            class: "disabled"
        })["append"]($("<span/>", {
            class: "autoculture farm_town_status_0"
        })))["append"]($("<li/>", {
            id: "Autobuild_onoff",
            class: "disabled"
        })["append"]($("<span/>", {
            class: "autobuild toolbar_activities_recruits"
        })))["append"]($("<li/>", {
            id: "Autoattack_onoff",
            class: "disabled"
        })["append"]($("<span/>", {
            class: "autoattack sword_icon"
        })))["append"]($("<li/>")["append"]($("<span/>", {
            href: "#",
            class: "botsettings circle_button_settings"
        })["on"]("click", function() {
            if (Autobot["isLogged"]) {
                Autobot["initWnd"]()
            }
        })["mousePopup"](new MousePopup(DM["getl10n"]("COMMON")["main_menu"]["settings"]))))))["append"]($("<div/>", {
            id: "time_autobot",
            class: "time_row"
        }))["append"]($("<div/>", {
            class: "bottom"
        }))["insertAfter"](".nui_left_box")
    },
    initMapTownFeature: function() {
        var variable_1f = function(variable_143) {
            return function() {
                var variable_1b = variable_143["apply"](this, arguments);
                return Autobot["town_map_info"](variable_1b, arguments[0])
            }
        };
        MapTiles["createTownDiv"] = variable_1f(MapTiles["createTownDiv"])
    },
    checkAutoRelogin: function() {
        if (typeof $["cookie"]("pid") !== "undefined" && typeof $["cookie"]("ig_conv_last_site") !== "undefined") {
            var variable_20 = $["cookie"]("ig_conv_last_site")["match"](/\/\/(.*?)\.grepolis\.com/g)[0]["replace"]("//", "")["replace"](".grepolis.com", "");
            DataExchanger.Auth("checkAutorelogin", {
                player_id: $["cookie"]("pid"),
                world_id: variable_20
            }, function(variable_7) {
                if (variable_7 != 0) {
                    setTimeout(function() {
                        DataExchanger["login_to_game_world"](variable_20)
                    }, variable_7 * 1000)
                }
            })
        }
    }
};
(function() {
    String["prototype"]["capitalize"] = function() {
        return this["charAt"](0)["toUpperCase"]() + this["slice"](1)
    };
    $["fn"]["serializeObject"] = function() {
        var variable_21 = {};
        var variable_22 = this["serializeArray"]();
        $["each"](variable_22, function() {
            if (variable_21[this["name"]] !== undefined) {
                if (!variable_21[this["name"]]["push"]) {
                    variable_21[this["name"]] = [variable_21[this["name"]]]
                };
                variable_21[this["name"]]["push"](this["value"] || "")
            } else {
                variable_21[this["name"]] = this["value"] || ""
            }
        });
        return variable_21
    };
    var variable_23 = setInterval(function() {
        if (window["$"] != undefined) {
            if ($(".nui_main_menu")["length"] && !$["isEmptyObject"](ITowns["towns"])) {
                clearInterval(variable_23);
                Autobot["initWindow"]();
                Autobot["initMapTownFeature"]();
                $["getScript"](Autobot["domain"] + "Evaluate.js", function() {
                    $["when"]($["getScript"](Autobot["domain"] + "DataExchanger.js"), $["getScript"](Autobot["domain"] + "ConsoleLog.js"), $["getScript"](Autobot["domain"] + "FormBuilder.js"), $["getScript"](Autobot["domain"] + "ModuleManager.js"), $["getScript"](Autobot["domain"] + "Assistant.js"), $.Deferred(function(variable_24) {
                        $(variable_24["resolve"])
                    }))["done"](function() {
                        Autobot["init"]()
                    })
                })
            } else {
                if (/grepolis\.com\/start\?nosession/g ["test"](window["location"]["href"])) {
                    clearInterval(variable_23);
                    $["getScript"](Autobot["domain"] + "Evaluate.js", function() {
                        $["when"]($["getScript"](Autobot["domain"] + "DataExchanger.js"), $["getScript"](Autobot["domain"] + "Redirect.js"), $.Deferred(function(variable_24) {
                            $(variable_24["resolve"])
                        }))["done"](function() {
                            Autobot["checkAutoRelogin"]()
                        })
                    })
                }
            }
        }
    }, 100)
})()
