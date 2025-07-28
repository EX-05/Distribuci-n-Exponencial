const mm1Container = document.createElement('div');
mm1Container.id = 'mm1Sim';
mm1Container.style.cssText = 'width: 15vw; height: 10vh; position: absolute; top: 10px; left: 10px; z-index: 100;';
document.body.appendChild(mm1Container);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, mm1Container.offsetWidth / mm1Container.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(mm1Container.offsetWidth, mm1Container.offsetHeight);
mm1Container.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff9f, transparent: true, opacity: 0.8 });
const queue = [];
let serverBusy = false;

function addCustomer(lambda) {
    if (Math.random() < lambda * 0.01) {
        const customer = new THREE.Mesh(geometry, material);
        customer.position.set(Math.random() * 5 - 2.5, Math.random() * 2 - 1, 0);
        scene.add(customer);
        queue.push(customer);
        if (!serverBusy && queue.length > 0) serveCustomer();
    }
}

function serveCustomer() {
    serverBusy = true;
    const customer = queue.shift();
    if (customer) {
        new TWEEN.Tween(customer.position).to({ x: 0, y: 0, z: 0 }, 1000).easing(TWEEN.Easing.Quadratic.Out).onComplete(() => {
            scene.remove(customer);
            serverBusy = false;
            if (queue.length > 0) serveCustomer();
        }).start();
    }
}

camera.position.z = 5;
function animateMM1() { requestAnimationFrame(animateMM1); TWEEN.update(); renderer.render(scene, camera); addCustomer(0.5); }
animateMM1();