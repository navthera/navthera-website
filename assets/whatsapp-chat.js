/* Navthera WhatsApp entry point. The AI conversation itself runs server-side. */
(function () {
    'use strict';

    var phoneNumber = '9116032400';
    var message = 'Hello, I would like help with Navthera services or booking an appointment.';
    var href = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);

    function mountChatButton() {
        if (document.querySelector('.navthera-whatsapp-chat')) return;

        var style = document.createElement('style');
        style.textContent = '.navthera-whatsapp-chat{position:fixed;right:24px;bottom:24px;z-index:9999;display:inline-flex;align-items:center;gap:10px;padding:14px 18px;border-radius:999px;background:#25D366;color:#fff;font:600 14px/1 Inter,Arial,sans-serif;text-decoration:none;box-shadow:0 10px 28px rgba(8,27,48,.28);transition:transform .2s ease,box-shadow .2s ease}.navthera-whatsapp-chat:hover,.navthera-whatsapp-chat:focus-visible{color:#fff;transform:translateY(-2px);box-shadow:0 14px 34px rgba(8,27,48,.34)}.navthera-whatsapp-chat svg{width:22px;height:22px;fill:currentColor}@media(max-width:480px){.navthera-whatsapp-chat{right:16px;bottom:16px;padding:14px}.navthera-whatsapp-chat span{display:none}}';
        document.head.appendChild(style);

        var button = document.createElement('a');
        button.className = 'navthera-whatsapp-chat';
        button.href = href;
        button.target = '_blank';
        button.rel = 'noopener';
        button.setAttribute('aria-label', 'Chat with Navthera on WhatsApp');
        button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg><span>Chat on WhatsApp</span>';
        document.body.appendChild(button);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountChatButton);
    else mountChatButton();
}());
