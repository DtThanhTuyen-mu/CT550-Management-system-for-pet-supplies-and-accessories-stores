import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import "./ReadMore.scss";

const ELLIPSES = "…";
const SPACE_CHARACTER = " ";
const READ_MORE_LABEL = "Read More";
const SHOW_LESS_LABEL = "Show Less";

export default class ReadMore extends Component {
  constructor(props) {
    super(props);
    this._handleResize = debounce(this._handleResize, 200);
  }

  static propTypes = {
    numberOfLines: PropTypes.number,
    lineHeight: PropTypes.number,
    ellipses: PropTypes.string,
    readMoreLabel: PropTypes.string,
    showLessLabel: PropTypes.string,
    showLessButton: PropTypes.bool
  };

  static defaultProps = {
    /*
     * Number of lines to show
     */
    numberOfLines: 2,

    /*
     * A unitless value for the height of each line
     */
    lineHeight: 1.4,

    /*
     * If you don't want a "show less" link when showing all content, set this to false
     */
    showLessButton: true,

    /*
     * If the width of your container element is flexible set this to true
     */
    flexibleContainer: false,

    /*
     * Charaters appended to the abbreviated text
     */
    ellipses: ELLIPSES,

    /*
     * Label for the Read more link
     */
    readMoreLabel: READ_MORE_LABEL,

    /*
     * Label for the Read less link
     */
    showLessLabel: SHOW_LESS_LABEL
  };

  state = {
    /*
     * The text that should be displayed based on the current state
     */
    readMoreText: null,

    /*
     * The read more / less link to be displayed based on current state
     */
    readMoreAction: null,

    /*
     * Whether all text is currently being shown
     */
    showingAllText: false
  };

  UNSAFE_componentWillMount() {
    this.setState({
      readMoreText: this.props.text
    });
  }

  UNSAFE_componentDidMount() {
    let { flexibleContainer } = this.props;
    this._updateContent();
    if (flexibleContainer) {
      window.addEventListener("resize", this._handleResize);
    }
  }

  UNSAFE_componentDidUpdate(prevProps, prevState) {
    this._updateContent();
  }

  UNSAFE_componentWillUnmount() {
    let { flexibleContainer } = this.props;
    if (flexibleContainer) {
      window.removeEventListener("resize", this._handleResize, false);
    }
  }

  _getHasTooMuchContent = () => {
    return (
      this.readMoreWrapper.scrollHeight > this.readMoreWrapper.offsetHeight
    );
  };

  _handleResize = () => {
    let readMoreText;

    this.setState((prevState, props) => {
      readMoreText = props.text;

      if (prevState.showingAllText) {
        return;
      }

      return {
        readMoreText,
        readMoreAction: null
      };
    }, this._cleanupResize());
  };

  _cleanupResize = () => {
    if (this.state.showingAllText) {
      this._toggleReadMore({ forceHide: true });
    }
    this._updateContent();
  };

  _toggleReadMore = ({ forceHide }) => {
    let readMoreAction;
    let readMoreText;
    let showingAllText;

    this.setState((prevState, props) => {
      showingAllText = forceHide || prevState.showingAllText;
      readMoreAction = this._getActionElement(!showingAllText);
      readMoreText = showingAllText ? prevState.readMoreText : props.text;
      return {
        readMoreText,
        readMoreAction,
        showingAllText: !showingAllText
      };
    });
  };

  _updateContent = () => {
    let trimmedText;
    let readMoreAction;
    let readMoreText;
    let teaserWordsArray;
    let hasTooMuchContent = this._getHasTooMuchContent();
    let { ellipses } = this.props;

    if (hasTooMuchContent) {
      this.setState((prevState, props) => {
        readMoreAction = this._getActionElement(prevState.showingAllText);
        teaserWordsArray = prevState.readMoreText.split(SPACE_CHARACTER);
        teaserWordsArray.pop();
        trimmedText = `${teaserWordsArray.join(SPACE_CHARACTER)}`;
        readMoreText = `${trimmedText}${ellipses}`;
        return {
          readMoreText,
          readMoreAction
        };
      });
    }
  };

  _getActionElement = (showingAllText) => {
    let { text, showLessButton, readMoreLabel, showLessLabel } = this.props;
    let buttonLabel = showingAllText ? showLessLabel : readMoreLabel;

    if (showingAllText && !showLessButton) {
      return;
    }

    return (
      <button onClick={this._toggleReadMore} className="read-more__button">
        {buttonLabel}
      </button>
    );
  };

  render() {
    let { numberOfLines, lineHeight } = this.props;
    let { showingAllText, readMoreText, readMoreAction } = this.state;
    let maxHeight = numberOfLines * lineHeight;
    let style = {
      lineHeight,
      maxHeight: showingAllText ? "none" : `${maxHeight}em`,
      // backgroundColor: "yellow"
      //  display: contents
    };

    return (
      <div
        style={style}
        className="read-more"
        ref={(node) => (this.readMoreWrapper = node)}
      > Mô tả: 
        {readMoreText} {readMoreAction}
      </div>
    );
  }
}
