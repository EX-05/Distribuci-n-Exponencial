document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('mm1Sim');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff9f, transparent: true, opacity: 0.8 });
    const queue = [];
    let serverBusy = false;

    function addCustomer() {
        const customer = new THREE.Mesh(geometry, material);
        customer.position.set(Math.random() * 10 - 5, Math.random() * 5 - 2.5, 0);
        scene.add(customer);
        queue.push(customer);
        if (!serverBusy && queue.length > 0) {
            serveCustomer();
        }
    }

    function serveCustomer() {
        serverBusy = true;
        const customer = queue.shift();
        if (customer) {
            new TWEEN.Tween(customer.position)
                .to({ x: 0, y: 0, z: 0 }, 2000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onComplete(() => {
                    scene.remove(customer);
                    serverBusy = false;
                    if (queue.length > 0) serveCustomer();
                })
                .start();
        }
    }

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
        renderer.render(scene, camera);
        if (Math.random() < 0.02) addCustomer(); // Tasa de llegada
    }

    animate();
});