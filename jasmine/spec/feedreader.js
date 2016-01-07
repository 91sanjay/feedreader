/* feedreader.js
 * @description Contains all specs that the application should satisfy to ensure that the requirements are met
 */
'use strict';

$(function () {

    /*
     * @describe RSS Feeds expects the allFeeds array to be defined and have atleast one entry.
     * It also verifies that each entry has a URL and a name.
     */
    describe('RSS Feeds', function () {
        it('allFeeds is defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('each entry should have a URL', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        it('each entry should have a name', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    /*
     * @describe The menu verifies the behavior of the collapsible menu. Clicking on the hamburger icon
     * should move the menu out of the viewport(initial default state). And Clicking on it again should toggle the menu into
     * the visible area.
     */
    describe('The menu', function () {
        it('menu is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('menu changes on click', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /*
     * @describe Initial Entries verifies that when the loadFeed function has completed,
     * there is at least one entry in the feed container
     */
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('feed container has atleast one entry', function (done) {
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /*
     * @describe New Feed Selection ensures that the content loaded initially changes on
     * URL change
     */
    describe('New Feed Selection', function () {
        var firstUrlEntries, secondUrlEntries;

        beforeEach(function (done) {
            $('.feed').empty();

            loadFeed(0, function () {
                firstUrlEntries = $('.feed').find('.entry').find('h2').text();
                done();
            });
        });

        it('content changes when new feed is loaded', function (done) {
            $('.feed').empty();

            loadFeed(1, function() {
                secondUrlEntries = $('.feed').find('.entry').find('h2').text();
                expect(firstUrlEntries).not.toEqual(secondUrlEntries);
                done();
            });
        });
    });
}());