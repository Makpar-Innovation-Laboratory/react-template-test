import React, { useState, useRef } from "react";
import cn from "classnames";
import useDynamicHeightField from "./useDynamicHeightField";
const INITIAL_HEIGHT = 46;

export default function CommentBox(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const outerHeight = useRef(INITIAL_HEIGHT);
    const textRef = useRef(null);
    const containerRef = useRef(null);
    useDynamicHeightField(textRef, commentValue)
    const onExpand = () => {
        if (!isExpanded) {
            outerHeight.current = containerRef.current.scrollHeight;
            setIsExpanded(true);
        }
    }
    const onChange = (e) => {
        setCommentValue(e.target.value);
    }
    const onClose = () => {
        setCommentValue("");
        setIsExpanded(false);
        props.setReplyToggle(false)
    };
    const onSubmit = (e) => {
        e.preventDefault();
        props.setReplyToggle(false)
        console.log('send the form data somewhere')
    }
    return(
        <form
            onSubmit={onSubmit}
            ref={containerRef}
            className={cn("comment-box", {
            expanded: isExpanded,
            collapsed: !isExpanded,
                    modified: commentValue.length > 0,
            })}
            style={{
            minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
            }}
        >
            <label htmlFor="comment">Comments...?</label>
            <textarea
                ref={textRef}
                onClick={onExpand}
                onFocus={onExpand}
                onChange={onChange}
                className="comment-field"
                placeholder=""
                value={commentValue}
                name="comment"
                id="comment"
            />
            <div className="actions">
                <button type="button" className="cancel" onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" disabled={commentValue.length < 1}>
                    Respond
                </button>
            </div>
        </form>
    );
};

