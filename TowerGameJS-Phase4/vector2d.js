//////////////////////////////////////////////////////////////////////////////////
// Vector2d V1.0.0
// (c) 2010 by R Cecco. <http://www.professorcloud.com>
// MIT License
//
// Please retain this copyright header in all versions of the software
//////////////////////////////////////////////////////////////////////////////////

// A handy 2d vector class.

var vector2d = function (vx, vy) { //just ya run of the mill vector class ✨

    var vec = {
        // x and y components of vector stored in x,y.
        x: vx,
        y: vy,

        // scale() method allows us to scale the vector
        // either up or down.
        scale: function (scale) {
            vec.x *= scale;
            vec.y *= scale;
            return (this);
        },

        // add() method adds a vector.
        add: function (vec2) {
            vec.x += vec2.x;
            vec.y += vec2.y;
            return (this);
        },
        subGetNew: function (vec2) {
            return (this.x - vec2.x, this.y - vec2.y);
        },

        // sub() method subtracts a vector.
        sub: function (vec2) {
            vec.x -= vec2.x;
            vec.y -= vec2.y;
            return (this);
        },
        multiply: function (scalar) {
            vec.x *= scalar;
            vec.y *= scalar;
            return (this);
        },

        dist: function (vec2) {
            return (vec2.copy().sub(this).length());
        },
        limit: function (max) {
            if (this.length() > max) {
                this.normalize();
                this.multiply(max);
            }
            return this;
        },


        mag: function (vec2) {
            return Math.sqrt((vec2.x - this.x) ** 2 + (vec2.y - this.y) ** 2);
        },

        // 2-20-17 added angleBetween()
        angleBetween: function (vec2) {
            return (vec2.angle() - this.angle());
        },

        // 2-20-17 added angle()
        angle: function () {
            return (Math.atan2(this.y, this.x));
        },

        // negate() method points the vector in the opposite direction.
        negate: function () {
            vec.x = -vec.x;
            vec.y = -vec.y;
            return (this);
        },

        // length() method returns the length of the vector using Pythagoras.
        length: function () {
            return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
        },

        // A faster length calculation that returns the length squared.
        // Useful if all you want to know is that one vector is longer than another.
        lengthSquared: function () {
            return vec.x * vec.x + vec.y * vec.y;
        },

        // normalize() method turns the vector into a unit length vector
        // pointing in the same direction.
        normalize: function () {
            let mag = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

            this.x /= mag;
            this.y /= mag;
        },
        subGet: function (other) {
            let xOffSet = other.x - this.x;
            let yOffSet = other.y - this.y;
            return vector2d(xOffSet, yOffSet);
        },
        // Rotates the vector by an angle specified in radians.
        rotate: function (angle) {
            var x = vec.x,
                y = vec.y,
                cosVal = Math.cos(angle),
                sinVal = Math.sin(angle);
            vec.x = x * cosVal - y * sinVal;
            vec.y = x * sinVal + y * cosVal;
            return (this);
        },
        rotatePoint: function (angle, around) {
            // Translate point to origin
            let translatedX = vec.x - around.x;
            let translatedY = vec.y - around.y;

            // Apply rotation
            let cosVal = Math.cos(angle);
            let sinVal = Math.sin(angle);
            let rotatedX = translatedX * cosVal - translatedY * sinVal;
            let rotatedY = translatedX * sinVal + translatedY * cosVal;

            // Translate point back
            vec.x = rotatedX + around.x;
            vec.y = rotatedY + around.y;

            return vec;
        },

        // toString() is a utility function for displaying the vector as text,
        // a useful debugging aid.
        toString: function () {
            return '(' + vec.x.toFixed(3) + ',' + vec.y.toFixed(3) + ')';
        },

        // 2-20-17 added dotProd
        dotProd: function (v2) {
            return (this.x * v2.x) + (this.y * v2.y);
        },

        // 2-20-17 added copy()
        copy: function () {
            return (vector2d(this.x, this.y));
        }
    };
    return vec;
};

function Vector2d() {
    if (arguments.length == 1) {
        this.x = arguments[0].x;
        this.y = arguments[0].y;
    }
    else {
        this.x = arguments[0];
        this.y = arguments[1];
    }

    // Multiply vector.
    Vector2d.prototype.mul = function (mul) {
        this.x *= mul;
        this.y *= mul;
        return (this);
    };

    // Add a vector.
    Vector2d.prototype.add = function (v2) {
        this.x += v2.x;
        this.y += v2.y;
        return (this);
    };

    // Subtract a vector.
    Vector2d.prototype.sub = function (v2) {
        this.x -= v2.x;
        this.y -= v2.y;
        return (this);
    };

    // Length of vector.
    Vector2d.prototype.len = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    Vector2d.addGetNew = function (v1, v2) {
        return new JSVector(v1.x + v2.x, v1.y + v2.y);
    }

    // Class method to return a new vector that is the difference of two vectors
    Vector2d.subGetNew = function (v1, v2) {
        return new JSVector(v1.x - v2.x, v1.y - v2.y);
    }

    // Normalize (unit length). Also returns length before normalisation.
    // 2-20-17 normalize the spelling of normalise to normalize
    Vector2d.prototype.normalize = function () {
        var len = Math.sqrt(this.x * this.x + this.y * this.y);
        if (len) {
            this.x /= len;
            this.y /= len;
        }
        return (this);
    };

    // Dot product.
    Vector2d.prototype.dotProd = function (v2) {
        return (this.x * v2.x) + (this.y * v2.y);
    };

    // Rotate vector by an angle in radians.
    Vector2d.prototype.rotate = function (ang) {
        this.x = (this.x * Math.cos(ang)) - (this.y * Math.sin(ang));
        this.y = (this.y * Math.cos(ang)) + (this.x * Math.sin(ang));
        return (this);
    };

    // Negate vector (point in opposite direction).
    Vector2d.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        return (this);
    };

    //toString function.
    Vector2d.prototype.toString = function () {
        return 'x = ' + this.x + ', y = ' + this.y;
    };

    Vector2d.prototype.rotate = function (angle) {
        this.x = Math.cos(angle) * this.x - Math.Sin(angle) * this.y
        this.y = Math.Sin(angle) * this.x + Math.Cos(angle) * this.y
        return (this);

    };

    // 2-20-17 added copy()
    Vector2d.prototype.copy = function () {
        return (new Vector2d(this.x, this.y));
    };

    // 2-20-17 added dist()
    Vector2d.prototype.dist = function (vec2) {
        return (vec2.copy().sub(this).len());
    };

    // 2-20-17 added angleBetween()
    Vector2d.prototype.angleBetween = function (vec2) {
        return (vec2.angle() - this.angle());
    };

    // 2-20-17 added angle()
    Vector2d.prototype.angle = function () {
        return (Math.atan2(this.y, this.x));
    };



    /* Vector2D CrossProduct(const Vector2D & v) const
     {
     return Vector2D(v.Y, -v.X);
     }
     */
};
