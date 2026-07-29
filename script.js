document.addEventListener('DOMContentLoaded', () => {

    // === Bagian 1: Elemen Surat & Musik (Kode Lama) ===
    const openButton = document.getElementById('open-letter-btn');
    const cover = document.getElementById('cover');
    const letter = document.getElementById('letter');
    const audioPlayer = document.getElementById('background-music');

    openButton.addEventListener('click', () => {
        cover.classList.add('fade-out');
        if (audioPlayer) {
            audioPlayer.play();
        }
        setTimeout(() => {
            cover.classList.add('hidden');
            letter.classList.remove('hidden');
        }, 800);
    });

    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // ======================================================
    // BAGIAN BARU: LOGIKA UNTUK MODAL
    // ======================================================

    // 1. Pilih semua elemen modal yang baru
    const heartTrigger = document.getElementById('heart-trigger');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalInitialContent = document.getElementById('modal-initial-content');
    const thankYouMessage = document.getElementById('thank-you-message');
    const btnMaafin = document.getElementById('btn-maafin');
    const btnGakMaafin = document.getElementById('btn-gak-maafin');
    const btnTutupModal = document.getElementById('btn-tutup-modal');

    // 2. Tampilkan modal saat hati diklik
    heartTrigger.addEventListener('click', () => {
        modalOverlay.classList.remove('hidden');
        modalOverlay.classList.add('overlay-flex');
    });

    // 3. Logika tombol "Maafin"
    btnMaafin.addEventListener('click', () => {
        // Sembunyikan galeri dan tombol
        modalInitialContent.classList.add('hidden');
        // Tampilkan pesan terima kasih
        thankYouMessage.classList.remove('hidden');
    });

    // 4. Logika tombol "Tidak Maafin" yang kabur-kaburan
    // Fungsi untuk memindahkan tombol
    function moveButton() {
        const modalContentRect = modalOverlay.getBoundingClientRect();
        const btnRect = btnGakMaafin.getBoundingClientRect();

        // Buat posisi X dan Y acak di dalam area modal
        // Kita kurangi 50px agar tombol tidak lari ke pinggir
        const newTop = Math.random() * (modalContentRect.height - btnRect.height - 50) + 25;
        const newLeft = Math.random() * (modalContentRect.width - btnRect.width - 50) + 25;
        
        // Terapkan posisi baru. Kita gunakan 'absolute' untuk bisa pindah seenaknya
        btnGakMaafin.style.position = 'absolute';
        btnGakMaafin.style.top = `${newTop}px`;
        btnGakMaafin.style.left = `${newLeft}px`;
    }

    // Pindahkan tombol saat mouse MENYENTUHNYA (hover)
    btnGakMaafin.addEventListener('mouseover', moveButton);
    // Pindahkan juga tombol saat (jika berhasil) DIKLIK
    btnGakMaafin.addEventListener('click', moveButton);

    // 5. Logika untuk menutup modal
    function closeModal() {
        modalOverlay.classList.add('hidden');
        modalOverlay.classList.remove('overlay-flex');
        
        // Reset modal ke kondisi awal untuk jika dibuka lagi
        setTimeout(() => { // Beri jeda sedikit agar tidak terlihat aneh
            modalInitialContent.classList.remove('hidden');
            thankYouMessage.classList.add('hidden');
            // Kembalikan tombol 'gak maafin' ke posisi semula
            btnGakMaafin.style.position = 'relative';
            btnGakMaafin.style.top = 'auto';
            btnGakMaafin.style.left = 'auto';
        }, 500);
    }

    // Tutup modal saat klik tombol "Tutup"
    btnTutupModal.addEventListener('click', closeModal);

    // Tutup modal saat klik di luar area konten (di overlay gelap)
    modalOverlay.addEventListener('click', (event) => {
        // Cek apakah yang diklik adalah overlay-nya, bukan konten di dalamnya
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
});