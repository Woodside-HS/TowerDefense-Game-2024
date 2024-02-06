class Missiles {
    constructor(location, bImg, angle, type) {
        this.loc = location;
        this.radius = 8;
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        this.clr = 'rgba(' + red + ',' + green + ',' + blue + ',' + 0.5 + ')';
        this.speed = 25;
        this.shape = "circle";
        this.angle = angle;
        this.img = bImg;
        this.ability = type;
    }

    run() {
        this.render();
        this.update();
    }

    render() {
        let ctx = towerGame.context;
        ctx.beginPath();

        if (this.visible) { //  not visible when first created
            ctx.drawImage(this.img, -this.img.width/2,-this.img.height/2);

        }
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.loc.y += Math.sin(this.angle) * this.speed;
        this.loc.x += Math.cos(this.angle) * this.speed;
    }
}