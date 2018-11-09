var box_minimized_dropdownLi = '<li data-id="{0}"><div class="username">{1}</div> <div class="remove">X</div></li>';
var placeholder = '<span class="placeholder">{0}</span>';

var chat = {
    boxMinimizedCount: function() {
        var _count = $('#main-chat .chat-single-box.minimized .chat-dropdown li').length;
        $('#main-chat .chat-single-box.minimized .count span').html($('#main-chat .chat-single-box.minimized .chat-dropdown li').length);
        if (_count == 0) {
            $('#main-chat .chat-single-box.minimized').remove();
        }
    },
    boxMinimizedUserAdd: function() {
        var _boxHidden = $('#main-chat .chat-single-box:not(".minimized"):not(".hidden")').eq(0);
        _boxHidden.addClass('hidden');
        var dataId = _boxHidden.data('id');
        var hasItem = false;
        $('#main-chat .chat-single-box.minimized .chat-dropdown li').each(function () {
            if ($(this).data('id') == dataId) {
                hasItem = true;
            }
        });
        if (!hasItem) {

            var dataUserName = _boxHidden.find('.user-info a').text();
            $('#main-chat .chat-single-box.minimized .chat-dropdown').append(box_minimized_dropdownLi.format(dataId, dataUserName));
        }
    },
    boxMinimized: function() {
        var _boxDefaultWidth = parseInt($('#main-chat .chat-single-box:not(".minimized")').css('width'));
        var _boxCommonWidth = parseInt($('.chat-box').css('width').replace('px', ''), 10) + parseInt($('#sidebar').css('width').replace('px', ''), 10);
        var _windowWidth = $(window).width();
        var _hasMinimized = false;
        $('#main-chat .boxs .chat-single-box').each(function (index) {
            if ($(this).hasClass('minimized')) {
                _hasMinimized = true;
            }
        });
        if ((_windowWidth) > (_boxCommonWidth)) {
            if (!_hasMinimized) {
                if ((_windowWidth) < 768) {

                    $(".chat-box").css('margin-right', '70px');
                    return;
                }
                else {
                    return;
                }
            }
            var dataId = $('#main-chat .boxs .minimized .chat-dropdown li').last().data('id');
            $('#main-chat .boxs .minimized .chat-dropdown li').last().remove();
            $('#main-chat .boxs .chat-single-box').each(function (index) {
                if ($(this).data('id') == dataId) {
                    $(this).removeClass('hidden');
                    return false;
                }
            });
        } else {
            if (!_hasMinimized) {
                $('#main-chat .boxs').prepend('<li class="chat-single-box minimized"><div class="count"><span>0</span></div><ul class="chat-dropdown"></ul></li>');
            }
            boxMinimizedUserAdd();
        }
        boxMinimizedCount();
    },
    ActiveChatBox: function(selector) {
        $('#main-chat .chat-single-box').removeClass('active');
        $(selector).addClass('active');
    },
    removeBoxCollapseClass: function(selector) {
        if ($(selector).hasClass('collapsed')) {
            $(selector).removeClass('collapsed');
        }
    },
    messageScroll: function() {
        setTimeout(function () {
            if ($('.messages div').length == 0) {
                return;
            }
            $('.message-scrooler').animate({
                scrollTop: $('.messages div:last').offset().top
            }, 0);
        }, 100);
    },
    initialTooltip: function() {
        $('[data-toggle="tooltip"]').tooltip({ delay: 50 });
        $('[data-toggle="tooltip"]').tooltip({ delay: 50 });
    },
    initialTooltipSiderbarUserList: function() {
        $('[data-toggle="tooltip"]').tooltip({ delay: 50 });
    },
    deinitialTooltipSiderbarUserList: function() {
        $('[data-toggle="tooltip"]').tooltip('dispose');
    },
    stickersTab: function() {
        setTimeout(function () {

            $('.stickers ul.tabs').tabs();
            $('.stickers ul.tabs').css({ 'height': '55px' });
    
        }, 1);
    },
    hideStickerBox: function() {
        $('#main-chat .chat-single-box .icons').removeClass('show');
        $('#main-chat .chat-single-box .icons').find('.smiles-set').removeAttr('style');
    },
    hideMinimizedBox: function() {
        if ($('#main-chat .boxs .minimized').hasClass('show')) {
            $('#main-chat .boxs .minimized').removeClass('show');
            $('#main-chat .boxs .minimized').find('.dropdown').removeAttr('style');
        }
    },
    NewMessage: function(dataId) {
        $('#main-chat .chat-box .boxs .chat-single-box').each(function () {
            if ($(this).data('id') == dataId) {
                $(this).addClass('new-message');
            }
        });
    },
    generatePlaceholder: function() {
        setTimeout(function () {
            $("#main-chat .textarea").each(function () {
                $(this).html(placeholder.format($(this).data('placeholder')));
            });
        }, 10);
    },
    sidebarClosed: function() {
        var windowWidth = $(window).width();
        if (windowWidth < 1100) {

            $('#main-chat').addClass('sidebar-closed');
        } else {
            $('#main-chat').removeClass('sidebar-closed');
        }
    }
};

module.exports = chat;