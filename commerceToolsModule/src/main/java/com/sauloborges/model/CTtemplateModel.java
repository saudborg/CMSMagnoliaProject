package com.sauloborges.model;

import javax.inject.Inject;
import javax.jcr.Node;

import info.magnolia.jcr.util.PropertyUtil;
import info.magnolia.rendering.model.RenderingModel;
import info.magnolia.rendering.model.RenderingModelImpl;
import info.magnolia.rendering.template.RenderableDefinition;

public class CTtemplateModel extends RenderingModelImpl<RenderableDefinition> {

	@Inject
	public CTtemplateModel(Node content, RenderableDefinition definition, RenderingModel<?> parent) {
		super(content, definition, parent);
	}

	private String title;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getUppercaseTitle() {
		return title.toUpperCase();
	}

	@Override
	public String execute() {
		title = PropertyUtil.getString(content, "title");
		if(title == null)
			title = "";
		return super.execute();
	}
}
