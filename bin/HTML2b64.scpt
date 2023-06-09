JsOsaDAS1.001.00bplist00�Vscript_�(() => {
        ObjC.import('AppKit');
    ObjC.import('ApplicationServices');
    ObjC.import('Quartz');
    ObjC.import('CoreGraphics');
    ObjC.import('WebKit');
    ObjC.import('objc');
	
	app = Application.currentApplication()
	app.includeStandardAdditions = true

	const args = $.NSProcessInfo.processInfo.arguments
    let html = args.js[4].js
	const baseURL = args.js[5].js
	const width = args.js[6].js
	const height = args.js[7].js
	
	let css = "";
	const cssMatch = html.matchAll(/<style type="text\/css">([\s\S]*?)<\/style>/g);
	if (cssMatch) {
		for (const m of cssMatch) {
			css += m[1];
            html = html.replace(m[0], "");
		}
	}
	
    const WKNavigationDelegate = $.objc_getProtocol('WKNavigationDelegate')

    const _NSApp = $.NSApplication.sharedApplication;
    
      if (!$['WebViewDelegate']) {
      ObjC.registerSubclass({
        name: 'WebViewDelegate',
        superclass: 'NSObject',
        protocols: ['WKNavigationDelegate'],
		properties: {
		   		result: 'id',
		},
        methods: {
          'webView:didFinishNavigation:': {
            types: ['void', ['id', 'id']],
            implementation: function (webview, navigation) {
    				let jsString = `var style = document.createElement('style'); style.innerHTML = '${css.replaceAll("\n", "\\n")}'; document.head.appendChild(style);`
					webview.evaluateJavaScriptCompletionHandler(jsString + "document.body.style.borderRadius = '20px';" + "[document.body.scrollWidth, document.body.scrollHeight];", (result, error) => {
						if (error.localizedDescription) {
                      	    $.NSLog(error.localizedDescription)
			  			  	this.result = $.NSString.stringWithString("Error")
                      	    return;
                      	}
												
                    	const snapConfig = $.WKSnapshotConfiguration.alloc.init
                  		snapConfig.setRect($.NSMakeRect(0, 0, width, height))
				  		snapConfig.setSnapshotWidth(width)						
						
						let bodyColor = "";
						const bodyColorMatch = jsString.matchAll(/body ?{[\s\S]*?background: ?(.*?);[\s\S]*?}/g);
						if (bodyColorMatch) {
							for (const m of bodyColorMatch) {
								bodyColor = m[1];
							}
						}
						
							if (bodyColor == "" || bodyColor == "transparent") {						
								webview.setValueForKey(true, "drawsTransparentBackground");
							}
														
                    		webview.takeSnapshotWithConfigurationCompletionHandler(snapConfig, (image, error) => {
                      			if (error.localizedDescription) {
                      			    $.NSLog(error.localizedDescription)
			  					  	this.result = $.NSString.stringWithString("Error")
                      			    return;
                      			}
                      			
								const rounded_img = $.NSImage.alloc.initWithSize(image.size)
								rounded_img.lockFocus

        						const ctx = $.NSGraphicsContext.currentContext
        						ctx.setImageInterpolation($.NSImageInterpolationHigh)

        						const imageFrame = $.NSMakeRect(0, 0, image.size.width, image.size.height)
        						const clipPath = $.NSBezierPath.bezierPathWithRoundedRectXRadiusYRadius(imageFrame, 10, 10)
        						clipPath.setWindingRule($.NSWindingRuleEvenOdd)
        						clipPath.addClip

        						image.drawAtPointFromRectOperationFraction($.NSZeroPoint, imageFrame, $.NSCompositingOperationSourceOver, 1)
        						rounded_img.unlockFocus
								
					  			const CGImage = rounded_img.CGImageForProposedRectContextHints(null, $.NSGraphicsContext.currentContext, $.NSDictionary.alloc.init);
   					  			const bitmap = $.NSBitmapImageRep.alloc.initWithCGImage(CGImage)
					  			const data = bitmap.representationUsingTypeProperties($.NSPNGFileType, $.NSDictionary.alloc.init)
                      			this.result = data.base64EncodedStringWithOptions(null)
					  		})
                  })
              }
          },
        },
      });
    }
    
 	const frame = $.NSMakeRect(0, 0, width, height / 2);
	const config = $.WKWebViewConfiguration.alloc.init
	const view = $.WKWebView.alloc.initWithFrameConfiguration(frame, config)
	const delegate = $.WebViewDelegate.alloc.init
	view.navigationDelegate = delegate
		
	if (baseURL != "https://" && baseURL != "") {
		const request = $.NSMutableURLRequest.requestWithURL($.NSURL.URLWithString(baseURL))
		request.setValueForHTTPHeaderField("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15", "User-Agent")
		const nav = view.loadRequest(request)
	} else {
		const nav = view.loadHTMLStringBaseURL(html, $.nil)
	}
    
	while (delegate.result.js == undefined) {
    	runLoop = $.NSRunLoop.currentRunLoop;
		today = $.NSDate.dateWithTimeIntervalSinceNow(0.1);
		runLoop.runUntilDate(today);
	}
		
	return delegate.result.js
})()                              � jscr  ��ޭ