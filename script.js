$(function() {
    // CONSTANTS
    var FINAL_POINT_VALUE = 1000000;
    var FRAMES_PER_SECOND = 60;

    // GLOBALS
    var clickPointIncrementValue = 1;
    var currentPointValue = (getCookie("currentPointValue") === "") ? 0 : parseInt(getCookie("currentPointValue"));
    var tick = 0;
    var seconds = (getCookie("seconds") === "") ? 0 : parseInt(getCookie("seconds"));
    var minutes = (getCookie("minutes") === "") ? 0 : parseInt(getCookie("minutes"));
    var hours = (getCookie("hours") === "") ? 0 : parseInt(getCookie("hours"));
    var secondsOutput = (getCookie("secondsOutput") === "") ? 0 : parseInt(getCookie("secondsOutput"));
    var minutesOutput = (getCookie("minutesOutput") === "") ? 0 : parseInt(getCookie("minutesOutput"));
    var hoursOutput = (getCookie("hoursOutput") === "") ? 0 : parseInt(getCookie("hoursOutput"));
    var timeElapsed = (getCookie("timeElapsed") === "") ? "00:00" : parseInt(getCookie("timeElapsed"));;

    // GENERATORS
    // if cookie is empty, set value to default, otherwise set it to the cookie
    var squares = {
        generateValue: (getCookie("squaresGenerateValue") === "") ? 1 : parseInt(getCookie("squaresGenerateValue")),
        price: (getCookie("squaresPrice") === "") ? 10 : parseInt(getCookie("squaresPrice")),
        upgradePrice: (getCookie("squaresUpgradePrice") === "") ? 1000 : parseInt(getCookie("squaresUpgradePrice")),
        upgradePriceMultiplier: 2,
        upgradePointsMultiplier: 2,
        amountOwned: (getCookie("squaresAmountOwned") === "") ? 1 : parseInt(getCookie("squaresAmountOwned")),
        upgradeTier: (getCookie("squaresUpgradeTier") === "") ? 1 : parseInt(getCookie("squaresUpgradeTier")),
        pointIncrementValue: (getCookie("squaresPointIncrementValue") === "") ? 0 : parseInt(getCookie("squaresPointIncrementValue")),
        name: "squares",
    };

    var circles = {
        generateValue: (getCookie("circlesGenerateValue") === "") ? 5 : parseInt(getCookie("circlesGenerateValue")),
        price: (getCookie("circlesPrice") === "") ? 150 : parseInt(getCookie("circlesPrice")),
        upgradePrice: (getCookie("circlesUpgradePrice") === "") ? 1500 : parseInt(getCookie("circlesUpgradePrice")),
        upgradePriceMultiplier: 2,
        upgradePointsMultiplier: 2,
        amountOwned: (getCookie("circlesAmountOwned") === "") ? 1 : parseInt(getCookie("circlesAmountOwned")),
        upgradeTier: (getCookie("circlesUpgradeTier") === "") ? 1 : parseInt(getCookie("circlesUpgradeTier")),
        pointIncrementValue: (getCookie("circlesPointIncrementValue") === "") ? 0 : parseInt(getCookie("circlesPointIncrementValue")),
        name: "circles",
    };

    var triangles = {
        generateValue: (getCookie("trianglesGenerateValue") === "") ? 10 : parseInt(getCookie("trianglesGenerateValue")),
        price: (getCookie("trianglesPrice") === "") ? 500 : parseInt(getCookie("trianglesPrice")),
        upgradePrice: (getCookie("trianglesUpgradePrice") === "") ? 5000 : parseInt(getCookie("trianglesUpgradePrice")),
        upgradePriceMultiplier: 3,
        upgradePointsMultiplier: 3,
        amountOwned: (getCookie("trianglesAmountOwned") === "") ? 1 : parseInt(getCookie("trianglesAmountOwned")),
        upgradeTier: (getCookie("trianglesUpgradeTier") === "") ? 1 : parseInt(getCookie("trianglesUpgradeTier")),
        pointIncrementValue: (getCookie("trianglesPointIncrementValue") === "") ? 0 : parseInt(getCookie("trianglesPointIncrementValue")),
        name: "triangles",
    };

    var diamonds = {
        generateValue: (getCookie("diamondsGenerateValue") === "") ? 25 : parseInt(getCookie("diamondsGenerateValue")),
        price: (getCookie("diamondsPrice") === "") ? 1000 : parseInt(getCookie("diamondsPrice")),
        upgradePrice: (getCookie("diamondsUpgradePrice") === "") ? 10000 : parseInt(getCookie("diamondsUpgradePrice")),
        upgradePriceMultiplier: 4,
        upgradePointsMultiplier: 4,
        amountOwned: (getCookie("diamondsAmountOwned") === "") ? 1 : parseInt(getCookie("diamondsAmountOwned")),
        upgradeTier: (getCookie("diamondsUpgradeTier") === "") ? 1 : parseInt(getCookie("diamondsUpgradeTier")),
        pointIncrementValue: (getCookie("diamondsPointIncrementValue") === "") ? 0 : parseInt(getCookie("diamondsPointIncrementValue")),
        name: "diamonds",
    };
    // END GENERATORS

    // ---------------------------------------------------------------------------------------------

    // PRESET OUTPUTS
    $("#pointGoal1").text(FINAL_POINT_VALUE);
    $("#pointGoal2").text(FINAL_POINT_VALUE);

    // tooltips
    $("#squarePurchase").attr("data-original-title", `Cost: ${squares.price} <br/>
                                        Generates: ${squares.generateValue} <br/>`);
    $("#circlePurchase").attr("data-original-title", `Cost: ${circles.price} <br/>
                                        Generates: ${circles.generateValue} <br/>`);
    $("#trianglePurchase").attr("data-original-title", `Cost: ${triangles.price} <br/>
                                        Generates: ${triangles.generateValue} <br/>`);
    $("#diamondPurchase").attr("data-original-title", `Cost: ${diamonds.price} <br/>
                                        Generates: ${diamonds.generateValue} <br/>`);

    $("#squareUpgrade").attr("data-original-title", `Cost: ${squares.upgradePrice} <br/>
                                       Multiplier: ${squares.upgradePointsMultiplier} <br/>`);
    $("#circleUpgrade").attr("data-original-title", `Cost: ${circles.upgradePrice} <br/>
                                       Multiplier: ${circles.upgradePointsMultiplier} <br/>`);
    $("#triangleUpgrade").attr("data-original-title", `Cost: ${triangles.upgradePrice} <br/>
                                       Multiplier: ${triangles.upgradePointsMultiplier} <br/>`);
    $("#diamondUpgrade").attr("data-original-title", `Cost: ${diamonds.upgradePrice} <br/>
                                       Multiplier: ${diamonds.upgradePointsMultiplier} <br/>`);

    $("#store img, #upgrade img").tooltip({
        html: true,
        placement: "right"
    });


    // END PRESET OUTPUTS

    // ---------------------------------------------------------------------------------------------

    // EVENT HANDLERS
    $("#incrementPointsButton").click(incrementPoints);
    $("div#store img").click(purchaseGenerator);
    $("div#upgrade img").click(purchaseUpgrade);
    $("#resetButton").click(resetGame);
    // END EVENT HANDLERS

    // ---------------------------------------------------------------------------------------------

    // STORE
    function purchaseGenerator() {
        var val = $(this).attr("id");

        // sets value of val to the object thats clicked
        switch (val) {
            case "squarePurchase": // square
                val = squares;
                break;
            case "circlePurchase": // circle
                val = circles;
                break;
            case "trianglePurchase": // triangle
                val = triangles;
                break;
            case "diamondPurchase": // diamonds
                val = diamonds;
                break;
        }

        // increases generator stuff
        if (currentPointValue >= val.price) {
            currentPointValue -= val.price;
            val.amountOwned++;
            val.pointIncrementValue += val.generateValue;
        } else {
            var idPurchase = val.name.slice(0, val.name.length - 1) + "Purchase"; // change purchase color
            $(`#${idPurchase}`).addClass("cantAfford");
            setTimeout(function() {
                $(`#${idPurchase}`).removeClass("cantAfford")
            }, 1000);
        }
    }
    // END STORE

    // ---------------------------------------------------------------------------------------------

    // UPGRADES
    // TODO: on function run, if point val is too low, flash tooltip (goto css stuff in else)
    function purchaseUpgrade() {
        var val = $(this).attr("id");
        switch (val) {
            case "squareUpgrade": // square
                val = squares;
                break;
            case "circleUpgrade": // circle
                val = circles;
                break;
            case "triangleUpgrade": // triangle
                val = triangles;
                break;
            case "diamondUpgrade": // diamonds
                val = diamonds;
                break;
        }

        if (currentPointValue >= val.upgradePrice) {
            if (val.upgradeTier < 4) { // upgrade cant be too high of a tier or it messes with updating image
                val.upgradeTier++; // increase tier
                currentPointValue -= val.upgradePrice; // subtract cost of upgrade from total
                val.upgradePrice *= val.upgradePriceMultiplier; // increases upgrade price
                val.pointIncrementValue *= val.upgradePointsMultiplier; // increases the points you income
                val.generateValue *= val.upgradePointsMultiplier; // increases generate value display
                updateUpgradeImage(val);
                updateUpgradeTooltip(val);
            }
        } else {
            var idUpgrade = val.name.slice(0, val.name.length - 1) + "Upgrade"; // change upgrade color
            console.log("asd");

            $(`#${idUpgrade}`).addClass("cantAfford");
            setTimeout(function() {
                $(`#${idUpgrade}`).removeClass("cantAfford")
            }, 1000);
        }
    }

    // make image color different per upgrade tier
    function updateUpgradeImage(val) {
        var idUpgrade = val.name.slice(0, val.name.length - 1) + "Upgrade"; // change upgrade color
        var idPurchase = val.name.slice(0, val.name.length - 1) + "Purchase"; // change purchase color
        $(`#${idUpgrade}`).attr("src", `img/upgrade/${idUpgrade}${val.upgradeTier}.png`); // change upgrade color
        $(`#${idPurchase}`).attr("src", `img/purchase/${idPurchase}${val.upgradeTier}.png`); // change purchase color
    }

    function updateUpgradeTooltip(val) {
        var idPurchase = val.name.slice(0, val.name.length - 1) + "Purchase"; // change purchase tooltips
        var idUpgrade = val.name.slice(0, val.name.length - 1) + "Upgrade"; // change upgrade tooltips
        $(`#${idPurchase}`).attr("data-original-title", `Cost: ${val.price} <br/>
                                                        Generates: ${val.generateValue} <br/>`).tooltip("show");
        $(`#${idUpgrade}`).attr("data-original-title", `Cost: ${val.upgradePrice} <br/>
                                                        Multiplier: ${val.upgradePointsMultiplier} <br/>`).tooltip("show");
    }
    // this on hover?

    // END UPGRADES

    // ---------------------------------------------------------------------------------------------

    // POINT GENERATION
    // on click
    function incrementPoints() {
        currentPointValue++;
    }

    // generators
    function generators() {
        currentPointValue += squares.pointIncrementValue;
        currentPointValue += circles.pointIncrementValue;
        currentPointValue += triangles.pointIncrementValue;
        currentPointValue += diamonds.pointIncrementValue;
    }

    // END POINT GENERATION

    // ---------------------------------------------------------------------------------------------

    // TIMER
    function checkTime(tick) {

        // seconds
        if (tick % 60 == 0) {
            seconds++;
            secondsOutput++;

            // minutes
            if (seconds > 0 && seconds % 60 == 0) {
                secondsOutput = 0;
                minutes++;
                minutesOutput++;

                // hours
                if (minutes > 0 && seconds > 0 && minutes % 60 == 0) {
                    minutesOutput = 0;
                    hours++;
                    hoursOutput++;
                }
            }
        }
        // output

        // hours > 0 = hours:minutes
        // hours < 0 = minutes:seconds
        timeElapsed =
            (hoursOutput > 0) ? // if hoursOutput > 0
            ((hoursOutput < 10) ? "0" + hoursOutput : hoursOutput) + ":" + ((minutesOutput < 10) ? "0" + minutesOutput : minutesOutput) + ":" + ((secondsOutput < 10) ? "0" + secondsOutput : secondsOutput) // hours:minutes:seconds
            : // if hours < 0
            ((minutesOutput < 10) ? "0" + minutesOutput : minutesOutput) + ":" + ((secondsOutput < 10) ? "0" + secondsOutput : secondsOutput); //minutes:seconds

        return timeElapsed;
    }
    // END TIMER

    // ---------------------------------------------------------------------------------------------

    // WINNING AND RESET
    function winGame() {
        // show screens
        $("#gameScreen1").hide();
        $("#store").hide();
        $("#upgrade").hide();
        $("#gameScreen2").show();

        $("#numSquareGeneratorsOwned1").text(squares.amountOwned - 1 + " x");
        $("#numCircleGeneratorsOwned1").text(circles.amountOwned - 1 + " x");
        $("#numTriangleGeneratorsOwned1").text(triangles.amountOwned - 1 + " x");
        $("#numDiamondGeneratorsOwned1").text(diamonds.amountOwned - 1 + " x");
        $("#finalTimeValue").text(timeElapsed);
    }

    // TODO: finish this function after tweaking
    function resetGame() {
        // show screens
        $("#gameScreen1").show();
        $("#store").show();
        $("#upgrade").show();
        $("#gameScreen2").hide();

        // reset images
        $("#squarePurchase").attr("src", "img/purchase/squarePurchase.png");
        $("#squareUpgrade").attr("src", "img/upgrade/squareUpgrade.png");
        $("#trianglePurchase").attr("src", "img/purchase/trianglePurchase.png");
        $("#triangleUpgrade").attr("src", "img/upgrade/triangleUpgrade.png");
        $("#circlePurchase").attr("src", "img/purchase/circlePurchase.png");
        $("#circleUpgrade").attr("src", "img/upgrade/circleUpgrade.png");
        $("#diamondPurchase").attr("src", "img/purchase/diamondPurchase.png");
        $("#diamondUpgrade").attr("src", "img/upgrade/diamondUpgrade.png");

        // reset values
        clickPointIncrementValue = 1;
        currentPointValue = 0;
        tick = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
        secondsOutput = 0;
        minutesOutput = 0;
        hoursOutput = 0;
        timeElapsed = "00:00";


        // GENERATORS
        squares = {
            generateValue: 1,
            price: 10,
            upgradePrice: 1000,
            upgradePriceMultiplier: 2,
            upgradePointsMultiplier: 2,
            amountOwned: 1,
            upgradeTier: 1,
            pointIncrementValue: 0,
            name: "squares",
        };

        circles = {
            generateValue: 5,
            price: 150,
            upgradePrice: 1500,
            upgradePriceMultiplier: 2,
            upgradePointsMultiplier: 2,
            amountOwned: 1,
            upgradeTier: 1,
            pointIncrementValue: 0,
            name: "circles",
        };

        triangles = {
            generateValue: 10,
            price: 500,
            upgradePrice: 5000,
            upgradePriceMultiplier: 3,
            upgradePointsMultiplier: 3,
            amountOwned: 1,
            upgradeTier: 1,
            pointIncrementValue: 0,
            name: "triangles",
        };

        diamonds = {
            generateValue: 25,
            price: 1000,
            upgradePrice: 10000,
            upgradePriceMultiplier: 4,
            upgradePointsMultiplier: 4,
            amountOwned: 1,
            upgradeTier: 1,
            pointIncrementValue: 0,
            name: "diamonds",
        };

        // tooltips
        $("#squarePurchase").attr("data-original-title", `Cost: ${squares.price} <br/>
    Generates: ${squares.generateValue} <br/>`);
        $("#circlePurchase").attr("data-original-title", `Cost: ${circles.price} <br/>
    Generates: ${circles.generateValue} <br/>`);
        $("#trianglePurchase").attr("data-original-title", `Cost: ${triangles.price} <br/>
    Generates: ${triangles.generateValue} <br/>`);
        $("#diamondPurchase").attr("data-original-title", `Cost: ${diamonds.price} <br/>
    Generates: ${diamonds.generateValue} <br/>`);

        $("#squareUpgrade").attr("data-original-title", `Cost: ${squares.upgradePrice} <br/>
   Multiplier: ${squares.upgradePointsMultiplier} <br/>`);
        $("#circleUpgrade").attr("data-original-title", `Cost: ${circles.upgradePrice} <br/>
   Multiplier: ${circles.upgradePointsMultiplier} <br/>`);
        $("#triangleUpgrade").attr("data-original-title", `Cost: ${triangles.upgradePrice} <br/>
   Multiplier: ${triangles.upgradePointsMultiplier} <br/>`);
        $("#diamondUpgrade").attr("data-original-title", `Cost: ${diamonds.upgradePrice} <br/>
   Multiplier: ${diamonds.upgradePointsMultiplier} <br/>`);

        $("#store img, #upgrade img").tooltip({
            html: true,
            placement: "right"
        });
    }
    // END WINNING AND RESET

    // ---------------------------------------------------------------------------------------------

    // COOKIE STUFF
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    $(window).on('beforeunload', function() {
        // SET COOKIES

        // squares
        setCookie("squaresGenerateValue", `${squares.generateValue}`, 10);
        setCookie("squaresPrice", `${squares.price}`, 10);
        setCookie("squaresUpgradePrice", `${squares.upgradePrice}`, 10);
        setCookie("squaresAmountOwned", `${squares.amountOwned}`, 10);
        setCookie("squaresUpgradeTier", `${squares.upgradeTier}`, 10);
        setCookie("squaresPointIncrementValue", `${squares.pointIncrementValue}`, 10);

        // circles
        setCookie("circlesGenerateValue", `${circles.generateValue}`, 10);
        setCookie("circlesPrice", `${circles.price}`, 10);
        setCookie("circlesUpgradePrice", `${circles.upgradePrice}`, 10);
        setCookie("circlesAmountOwned", `${circles.amountOwned}`, 10);
        setCookie("circlesUpgradeTier", `${circles.upgradeTier}`, 10);
        setCookie("circlesPointIncrementValue", `${circles.pointIncrementValue}`, 10);

        // triangles
        setCookie("trianglesGenerateValue", `${triangles.generateValue}`, 10);
        setCookie("trianglesPrice", `${triangles.price}`, 10);
        setCookie("trianglesUpgradePrice", `${triangles.upgradePrice}`, 10);
        setCookie("trianglesAmountOwned", `${triangles.amountOwned}`, 10);
        setCookie("trianglesUpgradeTier", `${triangles.upgradeTier}`, 10);
        setCookie("trianglesPointIncrementValue", `${triangles.pointIncrementValue}`, 10);

        // diamonds
        setCookie("diamondsGenerateValue", `${diamonds.generateValue}`, 10);
        setCookie("diamondsPrice", `${diamonds.price}`, 10);
        setCookie("diamondsUpgradePrice", `${diamonds.upgradePrice}`, 10);
        setCookie("diamondsAmountOwned", `${diamonds.amountOwned}`, 10);
        setCookie("diamondsUpgradeTier", `${diamonds.upgradeTier}`, 10);
        setCookie("diamondsPointIncrementValue", `${diamonds.pointIncrementValue}`, 10);

        // vars
        setCookie("currentPointValue", currentPointValue);
        setCookie("seconds", seconds);
        setCookie("minutes", minutes);
        setCookie("hours", hours);
        setCookie("secondsOutput", secondsOutput);
        setCookie("minutesOutput", minutesOutput);
        setCookie("hoursOutput", hoursOutput);
        setCookie("timeElapsed", timeElapsed);
    });

    $(window).on('load', function() {
        if (squares.upgradeTier > 1) {
            updateUpgradeImage(squares);
        }
        if (circles.upgradeTier > 1) {
            updateUpgradeImage(circles);
        }
        if (triangles.upgradeTier > 1) {
            updateUpgradeImage(triangles);
        }
        if (diamonds.upgradeTier > 1) {
            updateUpgradeImage(diamonds);
        }
    });


    // code used from Addy Osmani under MIT License (https://gist.github.com/addyosmani/5434533)
    // faster than writing this myself
    var limitLoop = function(fn, fps) {

        // Use var then = Date.now(); if you
        // don't care about targetting < IE9
        var then = new Date().getTime();

        // custom fps, otherwise fallback to 60
        fps = fps || 60;
        var interval = 1000 / fps;

        return (function loop(time) {
            requestAnimationFrame(loop);

            // again, Date.now() if it's available
            var now = new Date().getTime();
            var delta = now - then;

            if (delta > interval) {
                // Update time
                // now - (delta % interval) is an improvement over just 
                // using then = now, which can end up lowering overall fps
                then = now - (delta % interval);

                // call the fn
                fn();
            }
        }(0));
    };

    // GAME LOOP
    limitLoop(gameLoop, FRAMES_PER_SECOND);
    limitLoop(generators, 1);

    function gameLoop() {
        tick++; // increment time

        // check if game is won
        if (currentPointValue >= FINAL_POINT_VALUE) {
            winGame();
        }

        // DRAW UPDATING VALUES
        $("#timeElapsed").text(checkTime(tick)); // draw amount of points user currently has
        $("#userPoints").text(currentPointValue); // draw amount of points user currently has

        // number of generators
        $("#numSquareGeneratorsOwned").text(squares.amountOwned - 1 + " x");
        $("#numCircleGeneratorsOwned").text(circles.amountOwned - 1 + " x");
        $("#numTriangleGeneratorsOwned").text(triangles.amountOwned - 1 + " x");
        $("#numDiamondGeneratorsOwned").text(diamonds.amountOwned - 1 + " x");

        $("#squareGPS").text(squares.pointIncrementValue + "/s");
        $("#circleGPS").text(circles.pointIncrementValue + "/s");
        $("#triangleGPS").text(triangles.pointIncrementValue + "/s");
        $("#diamondGPS").text(diamonds.pointIncrementValue + "/s");
    }
});