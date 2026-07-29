// PDF styling constants
import { ColorTypes } from './types';

export const COLORS: ColorTypes = {
  // Core colors
  primary: [99, 159, 169],
  sectionHeader: [41, 112, 140],
  headerBg: [41, 112, 140],
  footerBg: [33, 33, 38],
  black: [26, 26, 26],
  gray: [115, 115, 115],
  lightGray: [217, 217, 217],
  white: [255, 255, 255],
  // Page/legend backgrounds
  pageBackground: [250, 250, 250],
  legendBg: [255, 255, 255],
  
  // Icon colors with background, border, and marker colors
  must: {
    bg: [94, 153, 224], // Blue
    border: [33, 150, 242],
    marker: [236, 241, 247]
  },
  like: {
    bg: [114, 196, 98], // Green
    border: [77, 176, 79],
    marker: [237, 244, 236]
  },
  maybe: {
    bg: [237, 181, 83], // Yellow
    border: [255, 194, 8],
    marker: [247, 243, 234]
  },
  'prefer-not': {
    bg: [153, 153, 153], // Gray
    border: [158, 158, 158],
    marker: [240, 240, 240]
  },
  'off-limit': {
    bg: [219, 79, 77], // Red
    border: [232, 74, 61],
    marker: [246, 234, 234]
  },
  talk: {
    bg: [171, 110, 224], // Purple
    border: [156, 38, 176],
    marker: [248, 245, 255]
  },
  notSet: {
    bg: [157, 176, 191], // Gray
    border: [158, 158, 158],
    marker: [255, 255, 255, 0]
  }
};

// PDF layout configuration
export const PDF_CONFIG = {
  // Layout in millimeters (jsPDF unit)
  margin: 18, // Page margins on all sides
  headerHeight: 32, // Height of main page header
  compactHeaderHeight: 16, // Height of subsequent page headers
  titleFontSize: 28, // Main title font size
  subtitleFontSize: 16, // People names subtitle font size
  sectionTitleFontSize: 17, // Category section header font size
  itemFontSize: 13, // Menu item name font size
  noteFontSize: 11, // Menu item note text font size
  lineHeight: 7.7, // Vertical space for each menu item line
  noteLineHeight: 4.4, // Line height for note text
  iconSize: 6.4, // Size of menu item status icons
  iconOffset: 10.5, // Horizontal space between icon and text
  markerHorizontalPadding: 2, // Padding around highlighted item text
  markerVerticalPadding: 0, // Vertical padding for item markers
  markerBorderRadius: 1, // Corner radius for item highlight markers
  sectionHeaderMargin: 4.5, // Space after section headers
  sectionLastItemMargin: 5.6, // Extra space after last item in section
  itemSpacing: 3.5, // Space between individual menu items
  noteItemSpacing: 1.1, // Space between item name and note text
  legendHeight: 14, // Height of icon legend section
  legendIconSize: 5.2, // Size of icons in legend
  legendFontSize: 10, // Font size for legend text
  legendCompactFontSize: 9, // Font size for compact legend
  legendBottomMargin: 3, // Space after legend before first section
  pageHeight: 270, // Usable page height for content
  footerHeight: 15.9, // Height of page footer
  minFooterMargin: 5, // Minimum space above footer
};