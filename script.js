  //                  <------ Navigation button---------->
  document.addEventListener('DOMContentLoaded', function() {
      const toggleBtn = document.querySelector('.royalc-toggle-btn');
      const tocSection = document.getElementById('royalc-menu');
      
    
      toggleBtn.addEventListener('click', function() {
        tocSection.classList.toggle('active');
        
        if (tocSection.classList.contains('active')) {
          toggleBtn.innerHTML = '<iconify-icon icon="mdi:close" width="86" height="16"></iconify-icon> Close';
        } else {
          toggleBtn.innerHTML = '<iconify-icon icon="mdi:menu" width="86" height="16"></iconify-icon> Navigation';
        }
      });
      
     
      const menuItems = document.querySelectorAll('.royalc-menu-item');
      menuItems.forEach(item => {
        item.addEventListener('click', function() {
      
          menuItems.forEach(i => i.classList.remove('active-item'));
          this.classList.add('active-item');
          
         
          if (window.innerWidth < 768) {
            setTimeout(() => {
              tocSection.classList.remove('active');
              toggleBtn.innerHTML = '<iconify-icon icon="mdi:menu" width="56" height="16"></iconify-icon> Navigation';
            }, 300);
          }
        });
      });
      
    
      const navContainer = document.querySelector('.royalc-nav-wrapper');
      let lastScrollTop = 0;
      
      window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop && currentScroll > 100) {
          
          navContainer.classList.add('nav-minimized');
        } else {
          
          navContainer.classList.remove('nav-minimized');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      }, {passive: true});
      
      
      function handleResponsive() {
        if (window.innerWidth <= 480) {
          document.querySelectorAll('.royalc-icon-circle iconify-icon').forEach(icon => {
            icon.setAttribute('width', '26');
            icon.setAttribute('height', '26');
          });
        } else {
          document.querySelectorAll('.royalc-icon-circle iconify-icon').forEach(icon => {
            icon.setAttribute('width', '22');
            icon.setAttribute('height', '22');
          });
        }
      }
      
      
      handleResponsive();
      window.addEventListener('resize', handleResponsive, {passive: true});

     
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
        
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
           
            history.pushState(null, null, targetId);
          }
        });
      });

     
      window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.royalc-section');
        const navItems = document.querySelectorAll('.royalc-menu-item');
        
        let current = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.clientHeight;
          
          if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = '#' + section.getAttribute('id');
          }
        });
        
        navItems.forEach(item => {
          item.classList.remove('active-item');
          if (item.getAttribute('href') === current) {
            item.classList.add('active-item');
          }
        });
      }, {passive: true});
    });

    // <----------------Swiper section -------------------> 
  document.addEventListener('DOMContentLoaded', function () {
            const swiper = new Swiper('.unique-tips-swiper', {
                slidesPerView: 1,
                spaceBetween: 0, 
                loop: true,
                centeredSlides: true, 
                slidesOffsetBefore: 0, 
                slidesOffsetAfter: 0, 
                autoHeight: false, 
                slideToClickedSlide: true, 
                navigation: {
                    nextEl: '.unique-swiper-button-next',
                    prevEl: '.unique-swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                        centeredSlides: false,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        centeredSlides: false,
                    },
                },
            });
     

            console.log('Swiper initialized:', swiper);
            if (window.innerWidth <= 767.98) {
                console.log('Mobile view detected');
                document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
                    console.log(`Slide ${index + 1} - Width: ${slide.offsetWidth}px, OffsetLeft: ${slide.offsetLeft}px, Computed Transform: ${window.getComputedStyle(slide).transform}`);
                });
                const container = document.querySelector('.unique-tips-swiper');
                console.log('Swiper container width:', container.offsetWidth, 'px');
                console.log('Swiper wrapper transform:', window.getComputedStyle(document.querySelector('.swiper-wrapper')).transform);
            }

         
            window.addEventListener('resize', () => {
                swiper.update();
                if (window.innerWidth <= 767.98) {
                    swiper.slideTo(swiper.activeIndex, 0, false); 
                }
            });

          
            setTimeout(() => {
                swiper.update();
                swiper.slideTo(swiper.activeIndex, 0, false);
            }, 100);
        });

        //<------------- games Swiper------------------->
       document.addEventListener('DOMContentLoaded', function() {
            const sliderInner = document.getElementById('sliderInner');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            let itemsPerPage = 4; 
            const totalItems = sliderInner.children.length;
            let maxIndex = Math.ceil(totalItems / itemsPerPage) - 1;
            let currentIndex = 0;
            
           
            function updateItemsPerPage() {
                if (window.innerWidth >= 1080) {
                    itemsPerPage = 6; 
                } else if (window.innerWidth >= 768) {
                    itemsPerPage = 4; 
                } else {
                    itemsPerPage = 2;
                }
                
                maxIndex = Math.ceil(totalItems / itemsPerPage) - 1;
                
            
                if (currentIndex > maxIndex) {
                    currentIndex = maxIndex;
                }
                
                updateSlider();
            }
            
            
            function updateSlider() {
                const translateValue = -currentIndex * (100 / itemsPerPage);
                sliderInner.style.transform = `translateX(${translateValue}%)`;
                
              
                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex >= maxIndex;
            }
            
           
            function goToNext() {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0; 
                }
                updateSlider();
            }
            
          
            function goToPrev() {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = maxIndex; 
                }
                updateSlider();
            }
            
           
            nextBtn.addEventListener('click', goToNext);
            prevBtn.addEventListener('click', goToPrev);
            
           
            const sportItems = document.querySelectorAll('.sport-item');
            sportItems.forEach((item) => {
                item.addEventListener('click', () => {
                    const sportName = item.querySelector('.sport-label').textContent;
                    console.log(`Selected sport: ${sportName}`);
                });
            });
            
            
            window.addEventListener('resize', updateItemsPerPage);
            
         
            updateItemsPerPage();
            
        
            let touchStartX = 0;
            let touchEndX = 0;
            
            sliderInner.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            sliderInner.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const swipeThreshold = 50; 
                if (touchEndX < touchStartX - swipeThreshold) {
                    goToNext();
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    goToPrev();
                }
            }
        });
  window.onscroll = function () {
      let scrollBtn = document.getElementById("scrollBtn");
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollBtn.style.display = "block";
      } else {
        scrollBtn.style.display = "none";
      }
    };

    // Scroll to top function
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }