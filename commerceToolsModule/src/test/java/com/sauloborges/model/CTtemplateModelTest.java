package com.sauloborges.model;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.mockito.Mockito.mock;

import javax.jcr.RepositoryException;

import org.junit.Test;

import info.magnolia.rendering.model.RenderingModel;
import info.magnolia.rendering.template.RenderableDefinition;
import info.magnolia.test.mock.jcr.MockNode;

public class CTtemplateModelTest {

	@Test
	public void testLowerCase() throws RepositoryException {

		MockNode root = new MockNode();
		String originalTitle = "testlowercase";
		root.setProperty("title", originalTitle);
		RenderableDefinition definition = mock(RenderableDefinition.class);
		RenderingModel<?> parent = mock(RenderingModel.class);

		CTtemplateModel model = new CTtemplateModel(root, definition, parent);
		model.execute();
		String uppercaseTitle = model.getUppercaseTitle();

		assertNotEquals(originalTitle, uppercaseTitle);
		assertEquals(originalTitle.toUpperCase(), uppercaseTitle);
	}

	@Test
	public void testUpperCase() throws RepositoryException {

		MockNode root = new MockNode();
		String originalTitle = "TESTUPPERCASE";
		root.setProperty("title", originalTitle);
		RenderableDefinition definition = mock(RenderableDefinition.class);
		RenderingModel<?> parent = mock(RenderingModel.class);

		CTtemplateModel model = new CTtemplateModel(root, definition, parent);
		model.execute();
		String uppercaseTitle = model.getUppercaseTitle();

		assertEquals(originalTitle, uppercaseTitle);
		
	}

	@Test
	public void testMixUpperAndLower() throws RepositoryException {

		MockNode root = new MockNode();
		String originalTitle = "tEsTmIxUpPeRaNdLoWeR";
		root.setProperty("title", originalTitle);
		RenderableDefinition definition = mock(RenderableDefinition.class);
		RenderingModel<?> parent = mock(RenderingModel.class);

		CTtemplateModel model = new CTtemplateModel(root, definition, parent);
		model.execute();
		String uppercaseTitle = model.getUppercaseTitle();

		assertNotEquals(originalTitle, uppercaseTitle);
		assertEquals(originalTitle.toUpperCase(), uppercaseTitle);
		
	}

	@Test
	public void testEmpty() throws RepositoryException {

		MockNode root = new MockNode();
		String originalTitle = "";
		root.setProperty("title", originalTitle);
		RenderableDefinition definition = mock(RenderableDefinition.class);
		RenderingModel<?> parent = mock(RenderingModel.class);

		CTtemplateModel model = new CTtemplateModel(root, definition, parent);
		model.execute();
		String uppercaseTitle = model.getUppercaseTitle();
		assertEquals(originalTitle, uppercaseTitle);
		
	}

	@Test
	public void testNull() throws RepositoryException {

		MockNode root = new MockNode();
		// root.setProperty("title", null);
		RenderableDefinition definition = mock(RenderableDefinition.class);
		RenderingModel<?> parent = mock(RenderingModel.class);

		CTtemplateModel model = new CTtemplateModel(root, definition, parent);
		model.execute();
		String uppercaseTitle = model.getUppercaseTitle();

		assertEquals("", uppercaseTitle);
		
	}

	@Test
	public void testNumbers() throws RepositoryException {

		MockNode root = new MockNode();
		Integer originalTitle = 1234;
		root.setProperty("title", originalTitle);
		RenderableDefinition definition = mock(RenderableDefinition.class);
		RenderingModel<?> parent = mock(RenderingModel.class);

		CTtemplateModel model = new CTtemplateModel(root, definition, parent);
		model.execute();
		String uppercaseTitle = model.getUppercaseTitle();
		assertEquals(Integer.toString(originalTitle), uppercaseTitle);
		
	}

}
