// App must be accessable for event listener callback
var hstApp = null;

class HstApp {
    constructor() {
        this.createListeners();
        this.validateTriangle();
    }

    createListeners() {
        $( ".hst-triangle-input" ).on( "input", function() {
            hstApp.validateTriangle();
        });
    }

    validateTriangle() {
        var validation = this.doValidateTriangle();

        if (validation === "valid") {
            var triangleType = this.determineTriangleType();
            this.setResultDisplay(triangleType, "valid");
        }
        else
            this.setResultDisplay(validation, "invalid");
    }

    triangleSideInputValues() {
        var side1 = $( "#hst-triangle-input-1" ).val(),
            side2 = $( "#hst-triangle-input-2" ).val(),
            side3 = $( "#hst-triangle-input-3" ).val();

        return {
            side1: parseFloat( side1 ), // parse string values to integers
            side2: parseFloat( side2 ),
            side3: parseFloat( side3 )
        };
    }

    doValidateTriangle() {
        var sides = this.triangleSideInputValues(),
            side1 = sides.side1,
            side2 = sides.side2,
            side3 = sides.side3;

        // Sides must be a positive value greater than zero to create a valid triangle
        if (side1 <= 0 || side2 <= 0 || side3 <= 0)
            return "nonpositive";

        // Check if all three sides have been filled out
        if (isNaN(side1) || isNaN(side2) || isNaN(side3))
            return "empty";

        /*
            A possible triangle must obey the Triangle Inequality Theorem:
            The sum of any two sides of a triangle must be greater than the measure of the third side.
        */
        if ( (side1 + side2 <= side3) || (side1 + side3 <= side2) || (side2 + side3 <= side1) )
            return "impossible";

        return "valid";
    }

    determineTriangleType() {
        var sides = this.triangleSideInputValues(),
            side1 = sides.side1,
            side2 = sides.side2,
            side3 = sides.side3;

        // If all three sides have the same length the triangle is equilateral.
        if (side1 === side2 && side1 === side3)
            return "equilateral";
        // If only two sides have the same length the triangle is isosceles.
        else if (side1 === side2 || side1 === side3 || side2 == side3)
            return "isosceles";
        // If all sides have different lengths, the triangle is scalene.
        else
            return "scalene";
    }

    setResultDisplay(type, validation) {
        // Set validation box color

        this.setValidationBoxText(type);
        this.setValidationBoxIcon(type);

        // Set validation box color
        if (validation === "valid")
            this.setValidationBoxColor("valid");
        else {
            if (type === "empty") {
                // User has not typed in all sides
                this.setValidationBoxColor("unvalidated");
            }
            else {
                // User input creates an invalid triangle
                this.setValidationBoxColor("invalid");
            }
        }
    }

    setValidationBoxColor(type) {
        var color;

        switch(type) {
            case "valid":       color = "valid";        break;
            case "invalid":     color = "invalid";      break;
            case "unvalidated": color = "unvalidated";  break;
            default:            color = "unvalidated";  break;
        }

        $( "#validation-box" ).attr("class",color);
    }

    setValidationBoxText(type) {
        var text;
        switch(type) {
            case "equilateral": text = "Equilateral";   break;
            case "isosceles":   text = "isosceles";     break;
            case "scalene":     text = "Scalene";       break;
            case "empty":       text = "Please input for all sides"; break;
            case "impossible":  text = "Impossible triangle";    break;
            case "nonpositive": text = "Sides cannot be zero or negative";    break;
            default:            text = "Unknown: " + type;       break;
        }
        $( "#validation-box-text" ).html(text);
    }

    setValidationBoxIcon(type) {
        var icon;
        switch(type) {
            case "equilateral": icon = "equilateral.svg";   break;
            case "isosceles":   icon = "isosceles.svg";     break;
            case "scalene":     icon = "scalene.svg";       break;
            case "empty":       icon = "empty.svg";         break;
            case "impossible":  icon = "impossible.svg";    break;
            case "nonpositive": icon = "invalid.svg";       break;
            default:            icon = "impossible.svg";    break;
        }

        $( "#validation-box-icon" ).html("<img src='res/svg-icons/" + icon + "' alt='" + type + "' height='185px' width='200px' />");
    }
}

window.onload = function() {
    // Initialize app on page load
    hstApp = new HstApp();
};
