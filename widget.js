// Widget de Chat CHANNEL
(function() {
    // Cria o elemento do widget
    const widgetHTML = `
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@7.2.96/css/materialdesignicons.min.css" rel="stylesheet">
    <div id="channel-chat-widget">
        <button id="channel-chat-button">
            <img src="https://app.corachat.com.br/webchat-logo.png" alt="WebChat Logo">
        </button>
    </div>

    <div id="channel-chat-container">
        <div id="channel-chat-header">
            <h3>WEBChat</h3>
            <span id="channel-chat-session" style="font-size:11px;color:#e3f2fd;margin-left:8px;"></span>
            <div style="display: flex; gap: 8px;">
                <button id="channel-chat-clear" title="Nova sessão" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;"><i class="mdi mdi-reload" style="font-size:16px;"></i></button>
                <button id="channel-chat-close" title="Fechar" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;"><i class="mdi mdi-close" style="font-size:16px;"></i></button>
            </div>
        </div>
        <div id="channel-chat-messages"></div>
        <div id="channel-chat-input-area">
            <input type="text" id="channel-chat-input" placeholder="Digite sua mensagem...">
            <input type="file" id="channel-chat-file" style="display: none;" accept="image/*,video/*,audio/*,.pdf,.doc,.docx">
            <button id="channel-chat-attach" title="Anexar arquivo" style="background: none; border: none; color: #2196F3; cursor: pointer; font-size: 20px; padding: 0 8px;"><i class="mdi mdi-paperclip"></i></button>
            <button id="channel-chat-send" title="Enviar mensagem" style="background: none; border: none; color: #2196F3; cursor: pointer; font-size: 20px; padding: 0 8px;"><i class="mdi mdi-send"></i></button>
        </div>
    </div>

    <style>
        #channel-chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
        }

        #channel-chat-button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #2196F3;
            border: none;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s;
        }

        #channel-chat-button:hover {
            transform: scale(1.1);
        }

        #channel-chat-button img {
            width: 30px;
            height: 30px;
        }

        #channel-chat-container {
            display: none;
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 320px;
            height: 500px;
            /* rede de seguranca para viewport baixa: sem isto, 500px + os 90px
               de bottom exigem 590px de altura e o cabecalho (com o botao
               fechar) sai pela borda de cima. Em janela normal, acima de
               ~610px, nao tem efeito nenhum — o painel continua com 500px. */
            max-height: calc(100vh - 110px);
            max-height: calc(100dvh - 110px);
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
            flex-direction: column;
            transition: all 0.3s;
            z-index: 9998;
        }

        #channel-chat-container.show {
            display: flex;
        }

        #channel-chat-widget.hide {
            display: none;
        }

        #channel-chat-header {
            background: #2196F3;
            color: white;
            padding: 12px 16px;
            border-radius: 16px 16px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        #channel-chat-header h3 {
            margin: 0;
            font-size: 16px;
        }

        #channel-chat-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 20px;
        }

        #channel-chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            background: #f7fafd;
        }

        #channel-chat-input-area {
            display: flex;
            padding: 12px;
            background: #f7fafd;
            border-top: 1px solid #e0e0e0;
            align-items: center;
        }

        #channel-chat-attach {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            transition: background-color 0.2s;
            color: #2196F3;
        }

        #channel-chat-attach:hover {
            background-color: rgba(33, 150, 243, 0.1);
        }

        #channel-chat-input {
            flex: 1;
            padding: 8px;
            border: 1px solid #cfd8dc;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
            margin-right: 8px;
        }

        #channel-chat-send {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            transition: background-color 0.2s;
            color: #2196F3;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 20px;
            padding: 0;
        }

        #channel-chat-send:hover {
            background-color: rgba(33, 150, 243, 0.1);
        }

        .mdi {
            font-size: 24px;
            line-height: 1;
        }

        .channel-message {
            max-width: 75%;
            /* so morde no celular deitado, onde a tela cheia passa de 800px e
               75% deixaria a linha longa demais. No desktop (painel de 320px) e
               no retrato o valor de 75% continua menor que o teto. */
            max-width: min(75%, 420px);
            margin-bottom: 8px;
            padding: 8px 12px;
            border-radius: 16px;
            word-break: break-word;
            font-size: 14px;
        }

        .channel-sent {
            background: #d1eaff;
            margin-left: auto;
            border-bottom-right-radius: 4px;
        }

        .channel-received {
            background: #fff;
            margin-right: auto;
            border-bottom-left-radius: 4px;
            border: 1px solid #e3f2fd;
            box-shadow: 0 1px 2px rgba(33,150,243,0.06);
        }

        .channel-ack {
            font-size: 10px;
            color: #888;
            margin-left: 8px;
        }

        .channel-media {
            max-width: 200px;
            margin: 4px 0;
        }

        .channel-media img {
            width: 100%;
            border-radius: 8px;
            cursor: pointer;
        }

        .channel-media video {
            width: 100%;
            border-radius: 8px;
            cursor: pointer;
        }

        .channel-media audio {
            width: 100%;
        }

        .channel-media-document {
            display: flex;
            align-items: center;
            padding: 8px;
            background: #f5f5f5;
            border-radius: 8px;
            text-decoration: none;
            color: #333;
        }

        .channel-media-document i {
            margin-right: 8px;
            font-size: 24px;
        }

        .channel-media-caption {
            margin-top: 4px;
            font-size: 13px;
            color: #666;
            padding: 4px 8px;
            background: #f5f5f5;
            border-radius: 4px;
        }

        /* citacao (mensagem respondida) — bloco no topo da bolha */
        .channel-quoted {
            display: block;
            border-left: 3px solid #2196F3;
            background: rgba(33,150,243,0.08);
            border-radius: 6px;
            padding: 4px 8px;
            margin-bottom: 6px;
            cursor: pointer;
            overflow: hidden;
        }

        /* na bolha enviada (fundo azul claro) o fundo azulado some — branco da contraste */
        .channel-sent .channel-quoted {
            background: rgba(255,255,255,0.6);
        }

        .channel-quoted-author {
            display: block;
            font-size: 11px;
            font-weight: 600;
            color: #1565c0;
            margin-bottom: 1px;
        }

        .channel-quoted-text {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 12.5px;
            color: #555;
            word-break: break-word;
        }

        .channel-quoted-hl {
            animation: channel-quoted-flash 1.3s ease;
        }

        @keyframes channel-quoted-flash {
            0% { box-shadow: 0 0 0 3px rgba(33,150,243,0.55); }
            100% { box-shadow: 0 0 0 3px rgba(33,150,243,0); }
        }

        .channel-menu-wrapper {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .channel-menu-title {
            font-size: 13px;
            font-weight: 600;
            color: #1565c0;
            word-break: break-word;
        }
        .channel-menu-container {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }
        .channel-menu-pill {
            border: 1px solid #2196F3;
            background: #ffffff;
            color: #2196F3;
            padding: 7px 10px;
            border-radius: 18px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s ease;
            max-width: 100%;
            word-break: break-word;
        }
        .channel-menu-pill:hover {
            background: #2196F3;
            color: #ffffff;
        }

        /* Tela cheia em duas situacoes: retrato ate 480px OU celular deitado
           (altura curta em aparelho de toque). O par hover:none + pointer:coarse
           garante que janela de desktop baixa NUNCA caia aqui — desktop reporta
           hover:hover / pointer:fine mesmo com a janela encolhida. */
        @media (max-width: 480px),
               (max-height: 480px) and (orientation: landscape) and (hover: none) and (pointer: coarse) {
            /* inset:0 no lugar de height:100vh — no iOS Safari 100vh mede a
               viewport SEM as barras, entao com bottom:0 o painel ficava mais
               alto que a area visivel e jogava o cabecalho (titulo e botao
               fechar) pra fora da tela por cima. */
            #channel-chat-container {
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: auto;
                height: auto;
                /* obrigatorio: o max-height da regra base cortaria a tela cheia
                   em 110px e devolveria o bug do cabecalho fora da tela. */
                max-height: none;
                max-width: 100vw;
                border-radius: 0;
                overflow: hidden;
            }
            #channel-chat-header {
                border-radius: 0;
                padding-top: calc(12px + env(safe-area-inset-top));
            }
            #channel-chat-input-area {
                flex: none;
                padding-bottom: calc(12px + env(safe-area-inset-bottom));
            }
            /* fonte < 16px faz o iOS dar zoom automatico ao focar o campo — era
               isso que deslocava a pagina e estourava as bordas laterais. */
            #channel-chat-input {
                font-size: 16px;
            }
            #channel-chat-widget {
                right: 20px;
                bottom: 20px;
            }
            /* com o painel em tela cheia o botao flutuante cobria anexar/enviar */
            #channel-chat-widget.chat-open {
                display: none;
            }
        }
    </style>
    `;

    // Adiciona o widget ao documento
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // Inicializa o widget
    const chatButton = document.getElementById('channel-chat-button');
    const chatContainer = document.getElementById('channel-chat-container');
    const chatClose = document.getElementById('channel-chat-close');
    const chatClear = document.getElementById('channel-chat-clear');
    const messagesDiv = document.getElementById('channel-chat-messages');
    const messageInput = document.getElementById('channel-chat-input');
    const sendButton = document.getElementById('channel-chat-send');
    const sessionSpan = document.getElementById('channel-chat-session');
    const widgetDiv = document.getElementById('channel-chat-widget');
    const fileInput = document.getElementById('channel-chat-file');
    const attachButton = document.getElementById('channel-chat-attach');

    // Variáveis globais para sessão e token
    let webchatId = null;
    let token = null;
    let ws = null;
    let chatLoaded = false;
    const tenantId = '11';
    // Para ativar logs do widget no console: window.WEBCHAT_DEBUG = true antes do load
    const LOGGER_ENABLED = (typeof window !== 'undefined' && window.WEBCHAT_DEBUG === true);

    // Funções de controle do widget
    chatButton.addEventListener('click', async () => {
        chatContainer.classList.add('show');
        // chat-open so tem regra dentro do @media (max-width:480px) — no desktop
        // o botao flutuante continua visivel como sempre foi
        widgetDiv.classList.add('chat-open');
        if (!chatLoaded) {
            await loadMessageHistory();
            connectWebSocket();
            chatLoaded = true;
        }
    });

    chatClose.addEventListener('click', () => {
        chatContainer.classList.remove('show');
        widgetDiv.classList.remove('chat-open');
    });

    // Função para gerar ID único de sessão
    function generateUniqueId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 8);
        return `${timestamp}-${random}`;
    }
    function generateSessionId() {
        if (!sessionStorage.getItem('channelWebchatId')) {
            sessionStorage.setItem('channelWebchatId', generateUniqueId());
        }
        return sessionStorage.getItem('channelWebchatId');
    }

    // Função para registrar o usuário no backend
    async function registerWebchat() {
        webchatId = generateSessionId();
        const name = 'WebChat ' + webchatId;
        const email = 'webchat@webchat.com';
        const tenantId = '11';
        const wabaId = '0c116a01-1a6c-452f-be61-717dc01e1844';
        const websocketToken = '15d2e30a-a395-4e6d-9913-c95a03603c14';
        const response = await fetch(`https://api.corachat.com.br/webchat/register/${wabaId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-websocket-token': websocketToken
            },
            body: JSON.stringify({ webchatId, name, email, tenantId })
        });
        const data = await response.json();
        token = data.token;
        return { webchatId, token };
    }

    // Renova o JWT per-sessão se faltar < 5min para expirar
    async function ensureFreshToken() {
        if (!token) {
            await registerWebchat();
            return;
        }
        try {
            const parts = token.split('.');
            if (parts.length < 2) {
                await registerWebchat();
                return;
            }
            const payload = JSON.parse(atob(parts[1]));
            const expMs = (payload.exp || 0) * 1000;
            if (expMs - Date.now() < 5 * 60 * 1000) {
                await registerWebchat();
            }
        } catch (e) {
            await registerWebchat();
        }
    }

    // Exibe o ID da sessão
    async function showSessionId() {
        const { webchatId } = await registerWebchat();
        sessionSpan.textContent = `Sessão: ${webchatId}`;
    }
    showSessionId();

    // Função para formatar hora
    function formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    // Função para formatar texto estilo WhatsApp
    function formatWhatsapp(text) {
        let formatted = String(text || '');
        formatted = formatted.replace(/\*(.*?)\*/g, '<b>$1</b>');
        formatted = formatted.replace(/NEW LINE/gi, '<br>');
        formatted = formatted.replace(/\\n/g, '<br>');
        formatted = formatted.replace(/\n/g, '<br>');
        return formatted;
    }

    function escapeHtml(text) {
        return String(text || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function parseMenuMessage(text) {
        const raw = String(text || '').trim();
        if (!raw.startsWith('#MENU')) return null;
        const normalized = raw
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/NEW LINE/gi, '\n')
            .replace(/\\n/g, '\n');
        const lines = normalized.split('\n').map(l => l.trim()).filter(Boolean);
        if (!lines.length) return null;
        const title = lines[0].replace(/^#MENU\s*/i, '').trim() || 'Escolha uma opcao';
        const items = lines.slice(1).map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
        if (!items.length) return null;
        return { title, items };
    }

    function buildMenuHtml(menu) {
        const buttonsHtml = menu.items.map(item => {
            const safe = escapeHtml(item);
            return `<button type="button" class="channel-menu-pill" data-menu-send="${safe}">${safe}</button>`;
        }).join('');
        return `<div class="channel-menu-wrapper"><div class="channel-menu-title">${escapeHtml(menu.title)}</div><div class="channel-menu-container">${buttonsHtml}</div></div>`;
    }


    // Escape proprio da citacao: o escapeHtml do menu so existe quando o widget
    // e gerado com menuButtons=1, e a citacao vale nos dois modos.
    function escQuoted(text) {
        return String(text === undefined || text === null ? '' : text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Texto curto da mensagem citada: corpo quando ha, senao o tipo da midia
    function quotedPreviewText(quoted) {
        var mt = String(quoted.mediaType || '').toLowerCase();
        var text = String(quoted.body || '');
        if (text.indexOf('caption: ') === 0) text = text.substring(9);
        if (mt === 'location') return 'Localização';
        if (mt === 'vcard') return 'Contato';
        if (text) return text;
        if (mt === 'image') return 'Imagem';
        if (mt === 'video') return 'Vídeo';
        if (mt === 'audio' || mt === 'ptt') return 'Áudio';
        if (mt && mt !== 'text' && mt !== 'chat') return 'Documento';
        return '';
    }

    // Bloco da mensagem respondida. fromMe = quem atende, entao do ponto de
    // vista de quem visita o site a autoria fica invertida (igual as bolhas).
    function buildQuotedHtml(quoted) {
        if (!quoted) return '';
        var text = quotedPreviewText(quoted);
        if (!text) return '';
        var author = quoted.fromMe ? 'Atendimento' : 'Você';
        var idAttr = quoted.id ? ' data-quoted-id="' + escQuoted(quoted.id) + '"' : '';
        return '<div class="channel-quoted"' + idAttr + '>'
            + '<span class="channel-quoted-author">' + escQuoted(author) + '</span>'
            + '<span class="channel-quoted-text">' + escQuoted(text) + '</span>'
            + '</div>';
    }

    // Rola a lista ate a mensagem original e pisca. scrollTop calculado na mao
    // (nao scrollIntoView) pra NUNCA rolar a pagina do site que hospeda o widget.
    function scrollToQuoted(quotedId) {
        var target = document.getElementById('msg-' + quotedId);
        if (!target) return;
        var tRect = target.getBoundingClientRect();
        var cRect = messagesDiv.getBoundingClientRect();
        messagesDiv.scrollTop += (tRect.top - cRect.top) - (messagesDiv.clientHeight - tRect.height) / 2;
        target.classList.remove('channel-quoted-hl');
        void target.offsetWidth; // reinicia a animacao se clicar duas vezes
        target.classList.add('channel-quoted-hl');
        setTimeout(function() { target.classList.remove('channel-quoted-hl'); }, 1400);
    }

    // Função para construir URL completa da mídia
    function buildMediaUrl(mediaUrl) {
        if (!mediaUrl) return null;
        if (mediaUrl.startsWith('http://') || mediaUrl.startsWith('https://')) {
            return mediaUrl;
        }
        const baseUrl = `https://api.corachat.com.br/public/${tenantId}`;
        return `${baseUrl}/${mediaUrl}`;
    }

    // Função para adicionar mensagem
    function appendMessage(text, type, time = '', ack = null, id = null, mediaType = null, mediaUrl = null, quoted = null) {
        const messageDiv = document.createElement('div');
        if (id) messageDiv.id = 'msg-' + id;
        messageDiv.className = `channel-message ${type}`;
        let ackHtml = '';
        if (type === 'channel-sent' && ack !== null && ack !== undefined) {
            ackHtml = `<span class="channel-ack">${getAckIcon(ack)}</span>`;
        }

        let contentHtml = '';
        let caption = '';
        
        if (text && text.startsWith('caption: ')) {
            caption = text.substring(9);
            text = '';
        }

        if (mediaType === 'location') {
            const mapsUrl = (text && /^https?:\/\//i.test(text)) ? text : '';
            contentHtml = `<a href="${mapsUrl || '#'}" target="_blank" rel="noopener" class="channel-media-document">
                <i>📍</i> <strong>Localização</strong>${mapsUrl ? '<br><small>Abrir no mapa</small>' : ''}
            </a>`;
        } else if (mediaType === 'vcard') {
            const fnMatch = String(text || '').match(/FN:([^\n]+)/);
            const telMatch = String(text || '').match(/TEL[^:]*:([^\n]+)/);
            const fn = fnMatch ? fnMatch[1].trim() : 'Contato';
            const tel = telMatch ? telMatch[1].trim() : '';
            contentHtml = `<div class="channel-media-document">
                <i>👤</i> <strong>${fn}</strong>${tel ? '<br><small>' + tel + '</small>' : ''}
            </div>`;
        } else if (mediaType && mediaUrl) {
            const fullMediaUrl = buildMediaUrl(mediaUrl);
            switch (mediaType.toLowerCase()) {
                case 'image':
                    contentHtml = `<div class="channel-media">
                        <img src="${fullMediaUrl}" alt="Imagem" onclick="window.open('${fullMediaUrl}', '_blank')">
                        ${caption ? `<div class="channel-media-caption">${formatWhatsapp(caption)}</div>` : ''}
                    </div>`;
                    break;
                case 'video':
                    contentHtml = `<div class="channel-media">
                        <video controls><source src="${fullMediaUrl}" type="video/mp4"></video>
                        ${caption ? `<div class="channel-media-caption">${formatWhatsapp(caption)}</div>` : ''}
                    </div>`;
                    break;
                case 'audio':
                    contentHtml = `<div class="channel-media">
                        <audio controls><source src="${fullMediaUrl}" type="audio/mpeg"></audio>
                        ${caption ? `<div class="channel-media-caption">${formatWhatsapp(caption)}</div>` : ''}
                    </div>`;
                    break;
                case 'document':
                    contentHtml = `<a href="${fullMediaUrl}" class="channel-media-document" target="_blank">
                        <i>📄</i>${caption || 'Documento'}
                    </a>`;
                    break;
                default:
                    contentHtml = `<span>${formatWhatsapp(text)}</span>`;
            }
        } else {

            const menuData = parseMenuMessage(text);
            if (menuData) {
                contentHtml = buildMenuHtml(menuData);
            } else {
                contentHtml = `<span style="white-space:normal;">${formatWhatsapp(text)}</span>`;
            }

        }

        messageDiv.innerHTML = buildQuotedHtml(quoted) + `${contentHtml}<br><span style="font-size:10px;color:#888;">${time} ${ackHtml}</span>`;
        messagesDiv.appendChild(messageDiv);

        const quotedEl = messageDiv.querySelector('[data-quoted-id]');
        if (quotedEl) {
            quotedEl.addEventListener('click', () => {
                scrollToQuoted(quotedEl.getAttribute('data-quoted-id'));
            });
        }

        messageDiv.querySelectorAll('[data-menu-send]').forEach(btn => {
            btn.addEventListener('click', () => {
                messageInput.value = btn.getAttribute('data-menu-send');
                sendButton.click();
            });
        });

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Função para atualizar o ack de uma mensagem
    function updateMessageAck(messageId, ack) {
        const msgDiv = document.getElementById('msg-' + messageId);
        if (msgDiv) {
            const ackSpan = msgDiv.querySelector('.channel-ack');
            if (ackSpan) {
                ackSpan.innerHTML = getAckIcon(ack);
            }
        }
    }

    // Função para obter ícone do ack
    function getAckIcon(ack) {
        if (ack === 0) return '🕓';
        if (ack === 1) return '✔️';
        if (ack === 2) return '<span style="color:#9E9E9E;">✔️</span>';
        if (ack === 3) return '<span style="color:#2196F3;">✔️✔️</span>';
        if (ack === -1) return '❌';
        return '';
    }

    // Função para renderizar o histórico completo
    function renderHistory(messages) {
        messagesDiv.innerHTML = '';
        messages.forEach(msg => {
            appendMessage(
                msg.body,
                msg.fromMe ? 'channel-received' : 'channel-sent',
                formatTime(msg.createdAt),
                msg.ack,
                msg.id,
                msg.mediaType,
                msg.mediaUrl,
                msg.quotedMsg
            );
        });
    }

    // Função para carregar histórico de mensagens
    async function loadMessageHistory() {
        try {
            await ensureFreshToken();
            const wabaId = '0c116a01-1a6c-452f-be61-717dc01e1844';
            const response = await fetch(`https://api.corachat.com.br/webchat/messages/${wabaId}?from=${webchatId}&tenantId=11`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                renderHistory(data);
            } else {
                LOGGER_ENABLED && console.warn('[WebChat] Resposta da API não é um array:', data);
            }
        } catch (error) {
            LOGGER_ENABLED && console.error('[WebChat] Erro ao carregar histórico:', error);
        }
    }

    // Função para gerar um ID temporário para mensagens enviadas
    function generateTempId() {
        return 'temp-' + Math.random().toString(36).substr(2, 9);
    }

    // Função para atualizar o ID de uma mensagem no DOM
    function updateMessageId(tempId, realId) {
        const tempDiv = document.getElementById('msg-' + tempId);
        if (tempDiv) {
            tempDiv.id = 'msg-' + realId;
        }
    }

    // Função para sanitizar o nome do arquivo
    function sanitizeFileName(filename) {
        if (!filename) return '';
        return filename
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9.\-_]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_+|_+$/g, '');
    }

    // Classifica o file.type em image/video/audio/document (PDF, doc, etc. caem em document)
    function classifyMediaType(file) {
        const t = (file && file.type ? String(file.type) : '').toLowerCase();
        if (t.indexOf('image/') === 0) return 'image';
        if (t.indexOf('video/') === 0) return 'video';
        if (t.indexOf('audio/') === 0) return 'audio';
        return 'document';
    }

    // Função para enviar mídia
    async function sendMedia(file) {
        const sanitizedFileName = sanitizeFileName(file.name);
        const formData = new FormData();

        formData.append('medias', file, sanitizedFileName);

        const data = {
            body: 'caption: ' + (messageInput.value.trim() || 'Mídia enviada'),
            from: webchatId,
            name: webchatId,
            email: webchatId + '@webchat.com',
            tenantId: '11',
            event: 'messages.upsert',
            fromMe: false,
            channel: 'webchat',
            type: 'webchat',
            webchatId: webchatId,
            mediaType: classifyMediaType(file),
            fileName: sanitizedFileName
        };

        formData.append('data', JSON.stringify(data));

        try {
            await ensureFreshToken();
            const wabaId = '0c116a01-1a6c-452f-be61-717dc01e1844';

            const response = await fetch(`https://api.corachat.com.br/webchat-webhook/${wabaId}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: formData
            });
            
            const responseText = await response.text();

            let respData = {};
            if (responseText) {
                try {
                    respData = JSON.parse(responseText);
                } catch (parseError) {
                    LOGGER_ENABLED && console.error('[WebChat] Erro ao fazer parse da resposta:', parseError);
                    throw new Error('Resposta inválida do servidor');
                }
            }

            if (!response.ok) {
                throw new Error(respData.message || 'Erro ao enviar mídia');
            }

            messageInput.value = '';
            
            const tempId = generateTempId();
            appendMessage(
                data.body,
                'channel-sent',
                formatTime(new Date().toISOString()),
                0,
                tempId,
                data.mediaType,
                null
            );

            await loadMessageHistory();

        } catch (error) {
            LOGGER_ENABLED && console.error('[WebChat] Erro detalhado ao enviar mídia:', {
                mensagem: error.message,
                stack: error.stack,
                erro: error
            });
            alert('Erro ao enviar mídia. Por favor, tente novamente.');
        }
    }

    // Event listeners para envio de mensagem
    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        if (message) {
            const tempId = generateTempId();
            appendMessage(message, 'channel-sent', formatTime(new Date().toISOString()), 0, tempId);
            messageInput.value = '';
            const data = {
                body: message,
                from: webchatId,
                name: webchatId,
                email: webchatId + '@webchat.com',
                tenantId: '11',
                event: 'messages.upsert',
                fromMe: false,
                channel: 'webchat',
                type: 'webchat',
                webchatId: webchatId
            };
            try {
                await ensureFreshToken();
                const wabaId = '0c116a01-1a6c-452f-be61-717dc01e1844';
                const response = await fetch(`https://api.corachat.com.br/webchat-webhook/${wabaId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(data)
                });
                const respData = await response.json();
                if (respData && respData.id) {
                    updateMessageId(tempId, respData.id);
                }
                if (respData && respData.mediaUrl) {
                    appendMessage(
                        respData.body,
                        'channel-sent',
                        formatTime(new Date().toISOString()),
                        0,
                        respData.id || tempId,
                        respData.mediaType,
                        respData.mediaUrl
                    );
                }

                await loadMessageHistory();

            } catch (error) {
                LOGGER_ENABLED && console.error('[WebChat] Erro ao enviar mensagem:', error);
            }
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    // Event listener para o botão de anexo
    attachButton.addEventListener('click', () => {
        fileInput.click();
    });

    // Event listener para seleção de arquivo
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            sendMedia(file);
        }
        fileInput.value = '';
    });

    // WebSocket para receber mensagens e ack em tempo real
    function connectWebSocket() {
        if (!webchatId || !token) return;
        
        let pingInterval;
        let historyInterval;
        let reconnectAttempts = 0;
        const MAX_RECONNECT_ATTEMPTS = 5;
        const RECONNECT_DELAY = 5000;
        const PING_INTERVAL = 30000;
        const HISTORY_INTERVAL = 60000;

        function connect() {
            ws = new WebSocket(`wss://api.corachat.com.br/wss?from=${webchatId}&token=${token}`);
            
            ws.onopen = () => {
                LOGGER_ENABLED && console.log('[WebChat] WebSocket conectado!');
                reconnectAttempts = 0;
                
                pingInterval = setInterval(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ type: 'ping' }));
                    }
                }, PING_INTERVAL);

                historyInterval = setInterval(async () => {
                    if (ws.readyState === WebSocket.OPEN) {
                        await loadMessageHistory();
                    }
                }, HISTORY_INTERVAL);
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'webhook' && data.payload && data.payload.message) {
                        const msg = data.payload.message;
                        appendMessage(
                            msg.body,
                            'channel-received',
                            formatTime(msg.createdAt),
                            msg.ack,
                            msg.id,
                            msg.mediaType,
                            msg.mediaUrl,
                            msg.quotedMsg
                        );
                        if (msg.mediaType) {
                            loadMessageHistory();
                        }
                    }
                    if (data.type === 'ack_update' && data.payload) {
                        if (data.payload.mediaType) {
                            const msgDiv = document.getElementById('msg-' + data.payload.id);
                            if (msgDiv) {
                                msgDiv.remove();
                                appendMessage(
                                    data.payload.body,
                                    'channel-sent',
                                    formatTime(data.payload.createdAt),
                                    data.payload.ack,
                                    data.payload.id,
                                    data.payload.mediaType,
                                    data.payload.mediaUrl,
                                    data.payload.quotedMsg
                                );
                            }
                        } else {
                            updateMessageAck(data.payload.messageId, data.payload.ack);
                        }
                    }
                    if (data.type === 'pong') {
                        LOGGER_ENABLED && console.log('[WebChat] Pong recebido');
                    }
                } catch (error) {
                    LOGGER_ENABLED && console.error('[WebChat] Erro ao processar mensagem WebSocket:', error);
                }
            };

            ws.onerror = (error) => {
                LOGGER_ENABLED && console.error('[WebChat] Erro na conexão WebSocket:', error);
            };

            ws.onclose = () => {
                LOGGER_ENABLED && console.log('[WebChat] Conexão WebSocket fechada');
                clearInterval(pingInterval);
                clearInterval(historyInterval);
                
                if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                    reconnectAttempts++;
                    LOGGER_ENABLED && console.log(`[WebChat] Tentando reconectar (tentativa ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
                    setTimeout(connect, RECONNECT_DELAY);
                } else {
                    LOGGER_ENABLED && console.error('[WebChat] Número máximo de tentativas de reconexão atingido');
                }
            };
        }

        connect();
    }

    // Função para limpar a sessão
    async function clearSession() {
        if (confirm('Tem certeza que deseja limpar a sessão e começar uma nova conversa?')) {
            messagesDiv.innerHTML = '';
            sessionStorage.removeItem('channelWebchatId');
            if (ws) {
                ws.close();
            }
            webchatId = null;
            token = null;
            chatLoaded = false;
            await showSessionId();
            await loadMessageHistory();
            connectWebSocket();
        }
    }

    chatClear.addEventListener('click', clearSession);
})(); 
