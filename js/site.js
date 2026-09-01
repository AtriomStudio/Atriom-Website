(() => {
    const header = document.querySelector('[data-header]');
    const nav = document.querySelector('[data-nav]');
    const navToggle = document.querySelector('[data-nav-toggle]');

    if (header) {
        const updateHeader = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 12);
        };

        updateHeader();
        window.addEventListener('scroll', updateHeader, { passive: true });
    }

    if (nav && navToggle) {
        const setNavigationOpen = (isOpen) => {
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
            nav.dataset.open = String(isOpen);
            document.body.classList.toggle('nav-open', isOpen);
        };

        navToggle.addEventListener('click', () => {
            setNavigationOpen(navToggle.getAttribute('aria-expanded') !== 'true');
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setNavigationOpen(false));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setNavigationOpen(false);
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 760) {
                setNavigationOpen(false);
            }
        });
    }

    const gameDialog = document.querySelector('[data-game-dialog-element]');

    if (gameDialog) {
        const games = {
            tizbin: {
                label: 'Find the difference',
                title: 'Tizbin',
                description: 'Compare two illustrated scenes and spot the small changes hidden between them. Tizbin keeps the pace relaxed, with no countdown and tools that help when a detail is hard to find.',
                features: ['No time limit', 'Zoom controls and optional hints', 'A growing set of illustrated levels'],
                url: 'https://cafebazaar.ir/app/com.Atriom.DifferenceMystery',
                action: 'Get it on Cafe Bazaar',
                images: [
                    { src: 'assets/img/tizbin-1.webp', alt: 'Tizbin illustrated comparison puzzle' },
                    { src: 'assets/img/tizbin-2.webp', alt: 'A second Tizbin find-the-difference level' },
                    { src: 'assets/img/tizbin-3.webp', alt: 'Another illustrated puzzle from Tizbin' }
                ],
                videos: []
            },
            karagah: {
                label: 'Hidden object mystery',
                title: 'Karagah Alavi',
                description: 'A fire has damaged a quiet town and several residents have disappeared. Detective Alavi examines scenes, tracks down hidden clues, and interviews the people connected to the case. Solving the mystery also unlocks resources used to rebuild the town.',
                features: ['Story-led hidden-object scenes', 'Clue gathering and character interviews', 'Town restoration between investigations'],
                url: 'https://cafebazaar.ir/app/com.joyixir.hiddenobjectgame',
                action: 'View on Cafe Bazaar',
                images: [
                    { src: 'assets/img/portfolio-5.jpg', alt: 'Karagah Alavi detective artwork' },
                    { src: 'assets/img/shader02_additional1.jpg', alt: 'A scene from Karagah Alavi' },
                    { src: 'assets/img/shader02_additional2.jpg', alt: 'Another scene from Karagah Alavi' }
                ],
                videos: []
            },
            'raz-vazheh': {
                label: 'Word puzzle',
                title: 'Raz Vazheh',
                description: 'Raz Vazheh turns scrambled Persian letters into short codebreaking challenges. Each solved arrangement reveals a hidden sentence and opens the next puzzle.',
                features: ['Persian word and sentence puzzles', 'Compact levels for short sessions', 'Clear letter-based controls'],
                url: 'https://cafebazaar.ir/app/com.Atriom.Razhe',
                action: 'View on Cafe Bazaar',
                images: [
                    { src: 'assets/img/Cryptogram-Icon.png', alt: 'Raz Vazheh Persian word puzzle artwork' }
                ],
                videos: []
            },
            aurora: {
                label: 'Puzzle prototype',
                title: 'Aurora',
                description: 'Aurora is a mobile puzzle prototype built around a quiet grayscale world. The work focused on lightweight Unity shaders, water and billboard effects, and a readable interface that could run on modest phones.',
                features: ['Minimal grayscale art direction', 'Mobile-friendly Unity shaders', 'Custom menu and in-game visual effects'],
                url: 'https://youtu.be/iAP0hbyaSK0',
                action: 'Open on YouTube',
                images: [
                    { src: 'assets/img/portfolio-1.jpg', alt: 'Aurora grayscale puzzle scene' },
                    { src: 'assets/img/portfolio-2.jpg', alt: 'Aurora in-game scene' }
                ],
                videos: [
                    { id: 'iAP0hbyaSK0', title: 'Aurora menu and visual direction' },
                    { id: 'UeOFgDJrB90', title: 'Aurora in-game effects' }
                ]
            },
            chess: {
                label: 'Board game',
                title: '2D Chess',
                description: 'A straightforward chess board for playing alone or sharing one phone with another player. Matches can use the built-in clock, and solo games include an AI opponent.',
                features: ['Single-player and local two-player modes', 'Built-in match timer', 'Computer opponent for solo play'],
                url: 'https://cafebazaar.ir/app/com.RazhiaGames.TwoPlayerChess',
                action: 'View on Cafe Bazaar',
                images: [
                    { src: 'assets/img/two-player-chess-1.webp', alt: '2D Chess game board' },
                    { src: 'assets/img/two-player-chess-2.webp', alt: '2D Chess match screen' },
                    { src: 'assets/img/two-player-chess-3.webp', alt: 'Another screen from 2D Chess' }
                ],
                videos: []
            }
        };

        const dialogLabel = gameDialog.querySelector('[data-dialog-label]');
        const dialogTitle = gameDialog.querySelector('[data-dialog-title]');
        const dialogDescription = gameDialog.querySelector('[data-dialog-description]');
        const dialogFeatures = gameDialog.querySelector('[data-dialog-features]');
        const dialogImages = gameDialog.querySelector('[data-dialog-images]');
        const dialogVideos = gameDialog.querySelector('[data-dialog-videos]');
        const dialogPrimary = gameDialog.querySelector('[data-dialog-primary]');
        const dialogClose = gameDialog.querySelector('.dialog-close');
        let activeTrigger = null;

        const populateDialog = (game) => {
            dialogLabel.textContent = game.label;
            dialogTitle.textContent = game.title;
            dialogDescription.textContent = game.description;
            dialogPrimary.href = game.url;
            dialogPrimary.textContent = game.action;

            dialogFeatures.replaceChildren();
            game.features.forEach((feature) => {
                const item = document.createElement('li');
                item.textContent = feature;
                dialogFeatures.append(item);
            });

            dialogImages.replaceChildren();
            game.images.forEach((image) => {
                const element = document.createElement('img');
                element.src = image.src;
                element.alt = image.alt;
                element.loading = 'lazy';
                dialogImages.append(element);
            });
            dialogImages.hidden = game.images.length === 0;

            dialogVideos.replaceChildren();
            game.videos.forEach((video) => {
                const wrapper = document.createElement('div');
                const frame = document.createElement('iframe');
                const caption = document.createElement('p');

                wrapper.className = 'dialog-video';
                frame.src = `https://www.youtube-nocookie.com/embed/${video.id}?rel=0`;
                frame.title = video.title;
                frame.loading = 'lazy';
                frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                frame.referrerPolicy = 'strict-origin-when-cross-origin';
                frame.allowFullscreen = true;
                caption.textContent = video.title;

                wrapper.append(frame, caption);
                dialogVideos.append(wrapper);
            });
            dialogVideos.hidden = game.videos.length === 0;
        };

        document.querySelectorAll('[data-game-dialog]').forEach((trigger) => {
            trigger.addEventListener('click', () => {
                const game = games[trigger.dataset.gameDialog];

                if (!game) {
                    return;
                }

                activeTrigger = trigger;
                populateDialog(game);
                document.body.classList.add('dialog-open');
                gameDialog.showModal();
                window.requestAnimationFrame(() => dialogClose.focus());
            });
        });

        gameDialog.querySelectorAll('[data-dialog-close]').forEach((button) => {
            button.addEventListener('click', () => gameDialog.close());
        });

        gameDialog.addEventListener('click', (event) => {
            if (event.target === gameDialog) {
                gameDialog.close();
            }
        });

        gameDialog.addEventListener('close', () => {
            document.body.classList.remove('dialog-open');
            dialogVideos.replaceChildren();
            activeTrigger?.focus();
            activeTrigger = null;
        });
    }

    const reveals = document.querySelectorAll('.reveal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
        reveals.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
    });

    reveals.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index % 4, 3) * 60}ms`;
        observer.observe(element);
    });
})();
