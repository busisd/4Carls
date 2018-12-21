elem = document.getElementsByClassName("tw-flex-grow-1 tw-full-height tw-pd-b-1")[0]

var config = { attributes: false, childList: true, subtree: false };

function cb(mutationList, observer) {
	mutationList.forEach(mutation => {
		newNodes=mutation.addedNodes;
		for (i=0;i<newNodes.length;i++){
			curNode = newNodes[i];
			curNodeTextFragments = curNode.getElementsByClassName("text-fragment")
			for (j=0;j<curNodeTextFragments.length;j++){
				curText = curNodeTextFragments[j];
				curText.innerHTML = curText.innerHTML.replace(/a/g, "<img src='https://static-cdn.jtvnw.net/emoticons/v1/25/1.0' />");
			}
		}
	})
};

ob = new MutationObserver(cb);

ob.observe(elem, config);