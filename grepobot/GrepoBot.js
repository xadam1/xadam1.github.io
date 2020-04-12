var GrepoBot =
{
    config:
    {
        activated: true,
        claimed: 0,
        debug: true,
        domain: "https://xadam1.github.io/grepo/",
        interval: 0,
        lang: Game.market_id,
        //libs: "https://ajax.googleapis.com/ajax/libs/",
        timeout: 3000,
        version: "0.2.2"
    },

    message:
    {
        en:
        {
            LOADED_SUCCESSFULLY: "GrepoBot v 0.2.2 loaded!",

            CAPTCHA: "A CAPTCHA has just been discovered, stop the bot.",
            CAPTAIN_IS_NOT_ACTIVE: "Captain is currently not activated!",
        }
    },
    towns: {},
    premium: {},

    announce: function(message)
    {
        if ($(".notice").length == 0)
        {
            $("#ui_box").append('<div class="notice"></div>');
            $("#ui_box").append($("<audio>",
            {
                preload: "auto",
                id: "mp3",
                src: this.config["domain"] + "sound/alert.mp3"
            }));
        }
        $(".notice").append($("<p>",
        {
            text: "GrepoBot: " + message
        }).on("click", function()
        {
            this.remove();
        }).delay(5000).fadeOut(1000));

        if (this.config["debug"])
        {
            console.log(new Date().toTimeString() + " " + message);
        }
    },

    claim: function()
    {
        var self = this, timeoutBetweenTowns = 0;
        jQuery.each(this.towns, function(key, town)
        {
            if (town.villages.length > 0)
            {
                setTimeout(function()
                {
                    var resources = ITowns.getResources(town.id), storage = resources.storage;

                    var iron = storage - resources.iron;
                    var wood = storage - resources.wood;
                    var stone = storage - resources.stone;

                    var json =
                    {
                        iron: 0,
                        town_id: town.id
                    };

                    var min = Math.floor(0.05 * storage);

                    var hide = ITowns.getTown(town.id).getBuildings().attributes.hide;

                    if (iron < min)
                    {
                        if (hide == 10 || hide * 1000 - ITowns.getTown(town.id).getEspionageStorage() < 2 * min)
                        {
                            self.storeIronIntoTheCave(town.id, 2 * min);
                        }
                        else
                        {
                            json.iron = 2 * min;
                        }
                    }

                    json.wood = (wood < min) ? 2 * min : 0;
                    json.stone = (stone < min) ? 2 * min : 0;

                    if (json.iron != 0 || json.stone != 0 || json.wood != 0)
                    {
                        self.sendResources(json);
                    }

                    if (self.isPremiumActive("captain"))
                    {
                        var json =
                        {
                            farm_town_ids: [],
                            time_option: 300,
                            claim_factor: ((ITowns.getTown(town.id).getCastedPower("forced_loyalty")) ? "double" : "normal"),
                            current_town_id: town.id,
                            town_id: Game.townId
                        };

                        jQuery.each(town.villages, function(k, village)
                        {
                            json.farm_town_ids.push(village.id);
                        });

                        var resources = ITowns.getTown(town.id).resources(), wood, stone;
                        var limit = Math.floor(0.05 * resources.storage);

                        if (resources.storage - resources.iron < limit)
                        {
                            self.storeIronIntoTheCave(town.id, 2 * limit);
                        }
                        if ((wood = resources.storage - resources.wood) < limit || (stone = resources.storage - resources.stone) < limit)
                        {
                            self.sendResources(
                            {
                                town_id: town.id,
                                iron: 0,
                                stone: ((stone < limit) ? 2 * limit : 0),
                                wood: ((wood < limit) ? 2 * limit : 0)
                            });
                        }
                        self.request("farm_town_overviews", "claim_loads", json, "post", function(wnd, response)
                        {});
                    }
                    else
                    {
                        var timeoutBetweenVillages = 0;
                        jQuery.each(town.villages, function(k, village)
                        {
                            setTimeout(function()
                            {
                                var json =
                                {
                                    target_id: village.id,
                                    claim_type: ((ITowns.getTown(town.id).getCastedPower("forced_loyalty")) ? "double" : "normal"),
                                    time: 300,
                                    town_id: town.id
                                };
                                self.request("farm_town_info", "claim_load", json, "post", function(wnd, response)
                                {
                                    if (response.error == "Dieses Bauerndorf gehört dir nicht.")
                                    {
                                        var index = self.towns[town.id].villages.map(function(obj)
                                        {
                                            return obj.id;
                                        }).indexOf(village.id);
                                        if (index != -1)
                                        {
                                            self.towns[town.id].villages.splice(index, 1);
                                        }
                                    }
                                    else
                                        if (village.level == -1)
                                        {
                                            village.level = response.expansion_stage;
                                        }
                                });
                            }, timeoutBetweenVillages += getRandom(500, 750));
                        });
                    }
                }, timeoutBetweenTowns += getRandom(6000, 8000));
            }
        });

        clearInterval(this.config["interval"]);
        this.config["interval"] = setInterval(function()
        {
            self.claim();
        }, getRandom(310000, 360000));
    },

    isPremiumActive: function(service)
    {
        return (this.premium.service > Timestamp.now());
    },

    load: function()
    {
        this.loader = new GPAjax(Layout, false);

        if (typeof jQuery == "undefined")
        {
            var script = document.createElement("script");

            //script.src = this.config["libs"] + "jquery/2.1.1/jquery.min.js";
            script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
            script.type = "text/javascript";

            document.getElementsByTagName("head")[0].appendChild(script);
        }

        $("head").append($("<link>",
        {
            rel: "stylesheet",
            type: "text/css",
            href: "https://xadam1.github.io/grepobot/GrepoBot.css"
        }));

        this.premium = Game.premium_features;
        this.loadTowns();

        if (this.isPremiumActive("curator"))
        {
            $(".ui_quickbar .left, .ui_quickbar .right").empty();
        }
        else
        {
            $(".ui_quickbar").append($("<div>",
            {
                class: "left"
            }), $("<div>",
            {
                class: "right"
            }));
        }

        this.loadMenuPanel();
        this.announce(this.message[en].LOADED_SUCCESSFULLY);
    },

    loadMenuPanel: function()
    {
        var off = "GrepoBot: [ <font color=\"red\"> OFF </font> ]";
        var on = "GrepoBot: [ <font color=\"green\"> ON </font> ]";

        var self = this;
        $(".ui_quickbar .left").append($("<div>",
        {
            class: "lfog",
            click: function()
            {
                if (self.config.activated)
                {
                    $(this).empty().append(off);
                }
                else
                {
                    $(this).empty().append(on);
                }
                self.switchState();
            }
        }).html(((self.config.activated) ? on : off)));

        $(".ui_quickbar .left").append($("<div>",
        {
            class: "lfog",
            click: function()
            {
                Layout.buildingWindow.open("main");
            }
        }).html("Senat"));

        $(".ui_quickbar .left").append($("<div>",
        {
            class: "lfog",
            click: function()
            {
                Layout.wnd.Create(Layout.wnd.TYPE_FARM_TOWN_OVERVIEWS, "Bauerndörfer");
            }
        }).html("Bauerndörfer"));

        $(".ui_quickbar .left").append($("<div>",
        {
            class: "lfog",
            click: function()
            {
                Layout.buildingWindow.open("academy");
            }
        }).html("Akademie"));

        $(".ui_quickbar .right").append($("<div>",
        {
            class: "lfog"
        }).html("Powered by GrepoBot (v. " + this.config.version + ")"));
    },

    loadTowns: function()
    {
        var self = this;
        jQuery.each(ITowns.getTowns(), function(k, object)
        {
            var town =
            {
                id: object.id,

                x: object.getIslandCoordinateX(),
                y: object.getIslandCoordinateY(),

                villages: []
            };

            self.towns[object.id] = town;
            self.loadFarmTowns(object.id);
        });
    },

    loadFarmTowns: function(townId)
    {
        var self = this;
        if (this.isPremiumActive("captain"))
        {
            var town = ITowns.getTown(townId);
            var json =
            {
                island_x: self.towns[townId].x,
                island_y: self.towns[townId].y,

                current_town_id: townId,

                booty_researched: town.researches().attributes.booty,
                trade_office: town.getBuildings().trade_office,

                town_id: Game.townId
            };

            this.request("farm_town_overviews", "get_farm_towns_for_town", json, "get", function(wnd, data)
            {
                jQuery.each(data.farm_town_list, function(k, object)
                {
                    if (object.rel > 0)
                    {
                        self.towns[townId].villages.push(
                        {
                            id: object.id,
                            level: object.stage
                        });
                    }
                });

                self.towns[townId].villages.sort(function(a, b)
                {
                    return a.level - b.level;
                });
            });
        }
        else
        {
            self.request("index", "switch_town",
            {
                town_id: townId
            }, "get", function(wnd, response)
            {
                jQuery.each(response.farm_towns, function(k, village)
                {
                    self.towns[townId].villages.push(
                    {
                        id: village.id,
                        level: -1
                    });
                })
            }, null);

            this.announce(this.message[en].CAPTAIN_IS_NOT_ACTIVE);
        }
    },

    request: function(controller, action, parameters, method, callback, module)
    {
        if (Game.bot_check != null)
        {
            $("#mp3").trigger("play");
            this.config.activated = false;
            this.announce(this.message[this.config.lang].CAPTCHA);

            return;
        }

        var self = this;
        var object =
        {
            success: function(context, data, flag, t_token)
            {
                if (callback)
                {
                    data.t_token = t_token;
                    if (data.bar && data.bar.resources)
                    {
                        ITowns.setResources(data.bar.resources, data.t_token);
                    }
                    if (data.success)
                    {
                        self.announce(data.success);
                    }
                    callback(self, data, flag);
                }
            },
            error: function(context, data, t_token)
            {
                if (data.error)
                {
                    self.announce(data.error);
                }
                console.log(self,data);
                callback(self, data);
            }
        };

        if (!parameters)
        {
            this.announce("Empty request has just been blocked");
            return;
        }

        parameters.nlreq_id = Game.notification_last_requested_id;
        this.loader[method](controller, action, parameters, false, object, module);
    },

    sendResources: function(json)
    {
        jQuery.each(this.towns[json.town_id].villages, function(k, village)
        {
            if (village.level < 5)
            {
                json.target_id = village.id;
                return false;
            }
        });

        this.request("farm_town_info", "send_resources", json, "post", function(wnd, response)
        {
            console.log(response);
        }, null);
        console.log("LFoG: Trying to send %s of wood, %s of stone and %s of iron", json.wood, json.stone, json.iron);
    },

    storeIronIntoTheCave: function(town_id, amount)
    {
        var json =
        {
            town_id: town_id
        };

        if (this.isPremiumActive("curator"))
        {
            json.active_town_id = Game.townId;
            json.iron_to_store = amount;

            this.request("town_overviews", "store_iron", json, "post", function(wnd, response)
            {}, null);
        }
        else
        {
            json.model_url = "BuildingHide";
            json.action_name = "storeIron";
            json.arguments =
            {
                iron_to_store: amount
            };

            this.request("frontend_bridge", "execute", json, "post", function(wnd, response)
            {}, null);
        }
    },

    switchState: function()
    {
        if (!this.config["activated"])
        {
            if ((new Date - this.config["claimed"]) > 300000)
            {
                this.claim();

                clearInterval(this.config["interval"]);
                this.config["interval"] = setInterval(function()
                {
                    this.LFoG.claim();
                }, getRandom(310000, 360000));
            }
        }
        else
        {
            clearInterval(this.config["interval"]);
        }
        this.config["activated"] = !this.config["activated"];
    },
};

function getRandom(a, b)
{
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

setTimeout(function()
{
    GrepoBot.load();
    if (GrepoBot.config.activated)
    {
        GrepoBot.config.interval = setInterval(function()
        {
            GrepoBot.claim();
        }, getRandom(310000, 360000));
    }
}, GrepoBot.config.timeout);
